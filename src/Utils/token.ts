import { sign, verify } from "jsonwebtoken";
import { v4 } from "uuid";
import { Redis } from "ioredis";

/**
 * @param data
 */
export const genToken = async (data: any) => {
  let token: string;

  token = sign(
    {
      ...data,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return token;
};

/**
 *
 * @param data
 * @param redis
 */
export const signTokenStore = async (data: any, redis?: Redis) => {
  const token = await genToken({
    ...data,
  });

  // store token in redis id
  if (redis) {
    const id = v4();
    await redis.set(id, token, "ex", 60 * 60 * 24);
    return id;
  }

  return token;
};

interface DecodeRegisterToken {
  invalid: boolean;
  decodedValue?: any;
}

/**
 * @param encrypt_id
 * @param redis
 */
export const decodeToken = async (encrypt_id: string, redis?: Redis) => {
  let eId = encrypt_id;

  if (redis) {
    eId = await redis.get(encrypt_id);
  }

  try {
    const decodedValue: any = await verify(eId, process.env.TOKEN_SECRET);

    const returnValue: DecodeRegisterToken = {
      invalid: false,
      decodedValue,
    };
    return returnValue;
  } catch (err) {
    console.log("error", err);
    return { invalid: true };
  }
};
