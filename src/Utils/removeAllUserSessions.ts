import { redis } from "../Services/cache";
import { redisessionprefix, userseesionidPrefix } from "./constants";
import { ObjectID } from "typeorm";

/**
 * @description    delete all the sessions of current user acroos devoices
 * @param user_id   id of user
 */
export const removeAllUserSessions = async (user_id: ObjectID) => {
  const sessionIds = await redis.lrange(
    `${userseesionidPrefix}${user_id}`,
    0,
    -1
  );

  const promises: any[] = [];
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < sessionIds.length; i++) {
    promises.push(redis.del(`${redisessionprefix}${sessionIds[i]}`));
  }
  await Promise.all(promises);
};
