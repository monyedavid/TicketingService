import { removeAllUserSessions } from "./removeAllUserSessions";
import { User } from "../Database/entities/User";
import { ObjectID } from "typeorm";

export const forgotPasswordLockAccount = async (id: ObjectID) => {
  // Lockout
  await User.repo().update({ id }, { forgotPasswordLock: true });
  // Remove all sessions
  await removeAllUserSessions(id);
};
