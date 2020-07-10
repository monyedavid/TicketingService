import { generateNamespace } from "@gql2ts/from-schema";
import * as fs from "fs";
import * as path from "path";
import { GenSchema } from "../Utils/generateSchema";

const typescriptTypes = generateNamespace("GQL", GenSchema());

fs.writeFile(
  path.join(__dirname, "../Types/schema.d.ts"),
  typescriptTypes,
  (err) => console.log(err)
);
