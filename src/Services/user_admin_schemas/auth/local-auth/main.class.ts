import { formatYupError } from "../../../../Utils/yup/formatYupError";
import { reg_schema } from "../../../../Utils/yup/auth.schema";

import {
  duplicateEmail,
  forgotPasswordLockError,
  invalidLogin,
  local,
  rsv,
  userseesionidPrefix,
} from "../../../../Utils/constants";
import { Redis } from "ioredis";

import { _LocalAuth } from "../../../../Types/auth.schema";
import { gsd } from "../../../../Utils/GenerateSessionData";
import Base from "../../shared/base";
import { Request } from "express-serve-static-core";
import { User } from "../../../../Database/entities/User";
import { Role } from "../../../../Database/entities/Role";
import { sendEmail } from "../../../../Utils/Mail/sendEmail";
import { createConfirmEmailLink } from "../../../../Utils/Mail/createConfirmEmailLink";
import { genToken } from "../../../../Utils/token";

const errorResponse = {
  ok: false,
  message: null,
  status: 401,
  error: [
    {
      path: "email",
      message: invalidLogin,
    },
  ],
};

export default class LocalAuth extends Base {
  /**
   * @method              register
   * @description         LOCAL AUTH REGISTER METHOD
   * @param args          arguments
   * @param redis         {Redis} connection instance
   */
  public async register(args: _LocalAuth.register, redis: Redis) {
    try {
      await reg_schema.validate(args, { abortEarly: false });
    } catch (error) {
      return {
        ok: false,
        message: rsv,
        status: 400,
        error: formatYupError(error),
      };
    }

    let userAlreadyExists: User;

    userAlreadyExists = await User.repo().findOne({ email: args.email });

    if (userAlreadyExists) {
      return {
        ok: false,
        message: null,
        status: 403,
        error: [
          {
            path: "email",
            message: duplicateEmail,
          },
        ],
      };
    }

    const _role = await Role.repo().findOne({ role_id: args.role });

    // const user = await User.repo().save({ ...args, role: _role });
    const user = await User.ci({ ...args, role: _role });

    if (process.env.NODE_ENV !== "test") {
      await sendEmail(
        args.email,
        await createConfirmEmailLink(this.url, user.id, redis)
      );
    }

    return { ok: true, message: null, status: 200, error: null };
  }

  /**
   * @method              login
   * @description         LOCAL AUTH LOGIN METHOD
   * @param user_name     {String} username or email address
   * @param password      {String} 🙄
   * @param session       {Express.Session} session object
   * @param sessionID     {String} session id
   * @param redis         {Redis} connection instance
   */
  public async login(
    { email, password }: _LocalAuth.login,
    { session, sessionID }: Request,
    redis: Redis
  ) {
    const user = await User.repo().findOne({ email });

    if (!user) {
      return errorResponse;
    }

    // TODO: Encrypt password with event listener @User Class
    // TODO: update validation method with new encrypted password

    if (!(await user.verify(password))) {
      return errorResponse;
    }

    if (user.forgotPasswordLock) {
      return {
        ok: false,
        message: null,
        status: 401,
        error: [
          {
            path: "password",
            message: forgotPasswordLockError,
          },
        ],
      };
    }

    // Login successfully

    /**
     * @description  Create redis memory stack with `PREFIX + USER_ID` ==> AS KEY || VALUE : SESSION_ID
     * @ifBlock      Check for existing memory stack with `${userseesionidPrefix}${user.user_id}`|| if > pre-designed length (for admin type) deny login
     */
    if (sessionID) {
      await redis.lpush(`${userseesionidPrefix}${user.id}`, sessionID);
    }

    // Assign Session
    session.user_id = user.id;
    session.user = gsd(user);
    session.auth_method = local;

    return {
      ok: true,
      message: JSON.stringify({
        todo: "successful login",
        token: await genToken(gsd(user)),
      }),
      status: 200,
      error: null,
    };
  }
}
