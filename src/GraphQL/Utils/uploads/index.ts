import { Repository } from "typeorm";
import { createWriteStream, unlink } from "fs";
import * as mkdirp from "mkdirp";
import shortid from "shortid";

async function streamToFileBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream
      .on("data", (chunk) => chunks.push(chunk))
      .on("end", () => {
        const file = Buffer.concat(chunks);
        resolve(file);
      })
      .on("error", reject);
  });
}

export async function returnAwaitUpload(upload) {
  const { createReadStream, filename, mimetype, encoding } = await upload; // file information and stream
  return { createReadStream, filename, mimetype, encoding };
}

/**
 * @method processUpload   Inject data stream as blob into database
 *                         &note: has no business with validation will create file buffer regardless of file submitted, validate file outside
 * @param upload           File
 * @param repository       Database repository of calling service
 */

export const processUpload = async (
  upload: any,
  repository: Repository<any>
): Promise<{
  file_id: number;
  filename: string;
  mimetype: string;
  encoding: string;
}> => {
  const {
    createReadStream,
    filename,
    mimetype,
    encoding,
  } = await returnAwaitUpload(upload); // file information and stream
  // createReadStream() -> open streams and has to be handled
  const file: any = await streamToFileBuffer(createReadStream());

  let file_id: number;
  try {
    const { id } = await repository.save({
      blob: file, // mysql converts file to blob
      filename,
      mimetype,
      encoding,
    });
    file_id = id;
  } catch (e) {
    throw new Error(
      JSON.stringify({
        path: "file upload",
        message: "an error occurred while uploading file, try again later",
        error: JSON.stringify(e),
      })
    );
  }

  return { file_id, filename, mimetype, encoding };
};

export const blobToFile = (theBlob: Blob, fileName: string): File => {
  const b: any = theBlob;
  // A Blob() is almost a File() - it's just missing the two properties below which we will add
  b.lastModifiedDate = new Date();
  b.name = fileName;

  // Cast to a File() type
  return theBlob as File;
};

/*
var myBlob = new Blob();

//do stuff here to give the blob some data...

var myFile = blobToFile(myBlob, "my-image.png");
 */

export const storeUploadToFIle = async ({
  createReadStream,
  filename,
}): Promise<any> => {
  // Ensure upload directory exists
  const uploadDir = "./uploads";
  mkdirp.sync(uploadDir);

  const id = shortid.generate();
  const path = `${uploadDir}/${id}-${filename}`;

  const stream = createReadStream();

  /*    stream
        .pipe(createWriteStream(path))
        .on('finish', () => console.log({ id, path }))
        .on('error', console.log("error happened"))*/

  await new Promise((resolve, reject) => {
    // Create a stream to which the upload will be written.
    const writeStream = createWriteStream(path);

    // When the upload is fully written, resolve the promise.
    writeStream.on("finish", resolve);

    // If there's an error writing the file, remove the partially written file
    // and reject the promise.
    writeStream.on("error", (error) => {
      unlink(path, () => {
        reject(error);
      });
    });

    // In node <= 13, errors are not automatically propagated between piped
    // streams. If there is an error receiving the upload, destroy the write
    // stream with the corresponding error.
    stream.on("error", (error) => writeStream.destroy(error));

    // Pipe the upload into the write stream.
    stream.pipe(writeStream);
  });

  return { id, path };
};

/*
creating blob process -> broken ☜ ( ﾟヮﾟ ☜)
mimeType != null
            ? new Blob(chunks, { type: mimeType })
            : new Blob(chunks);
 */
