import { Request, Response } from "express-serve-static-core";
import { redis } from "../../Services/cache";
import { User } from "../../Database/entities/User";

/**
 * @function        confirmEmail
 * @param           req  -> namespace e, interface Request
 * @param           res -> namespace e, interface Response
 * @description     confirm sign in address and update users.confirmed
 */

export const confirmEmail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (await redis.get(id)) as any;
  if (userId) {
    await User._().update({ id: userId }, { confirmed: true });
    await redis.del(id);
    // redirect to valid
    res.send("ok");
  } else {
    // redirect to invalid page
    res.send("Invalid");
  }
};
