import { v4 } from "uuid";
import { Redis } from "ioredis";
import { ObjectID } from "mongodb";

export const createConfirmEmailLink = async (
  url: string,
  userId: string | number | ObjectID,
  redis: Redis
) => {
  const id = v4();
  await redis.set(id, userId as string, "ex", 60 * 60 * 24);
  return `${url}/confirm/${id}`;
};
