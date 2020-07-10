import { Request, Response } from "express-serve-static-core";
import { Connection } from "typeorm";
import passport = require("passport");

import { frontendUrl, o_auth } from "../../../../Utils/constants";
import { _OAuthMiddleWare } from "../../../../Types/auth.schema";
import { gsd } from "../../../../Utils/GenerateSessionData";

const authenticate = (strategy: _OAuthMiddleWare.strategy) =>
  passport.authenticate(strategy, {
    session: false,
    failureRedirect: frontendUrl + "/register?oa=fail",
  });

const done = async (req: Request, res: Response) => {
  const gsd_user = gsd(req.user as any);
  const fTu = (req.user as any).firstTimeUser;
  (req.session as any).user = gsd_user;
  (req.session as any).user_id = (req.user as any).user_id;
  // (req.session as any).firstTimeUser = (req.user as any).firstTimeUser;
  (req.session as any).auth_method = o_auth;
  (req.session as any).accessToken = (req.user as any).accessToken;
  (req.session as any).refreshToken = (req.user as any).refreshToken;

  console.log(req.session, "final sessions data | oauth");

  // redirect to URL HERE
};

const verify_ = async (
  { accessToken, refreshToken, profile, cb }: _OAuthMiddleWare._passportVerify,
  conn: Connection[]
) => {
  const { username, provider, id, emails, name, photos } = profile;
  //
  // if (!emails[0].value) {
  //   return cb(null, null);
  // }
  // /**
  //  *    let photos = await connection
  //  *       .getRepository(Photo)
  //  *       .createQueryBuilder("photo")
  //  *       .innerJoinAndSelect("photo.metadata", "metadata")
  //  *       .getMany();
  //  */
  //
  // //  QUERY
  // const query = conn[0]
  //   .getRepository(users)
  //   .createQueryBuilder("user")
  //   .innerJoinAndSelect("user.role", "role_id")
  //   .where("user.oauth_uid = :id", { id });
  //
  // let email: string | null = null;
  // if (emails) {
  //   email = emails[0].value;
  //   query.orWhere("user.email = :email", { email });
  // }
  //
  // let user = await query.getOne();
  // // console.log(user, "first one");
  // let firstTimeUser = false;
  //
  // if (!user) {
  //   firstTimeUser = true;
  //   const _role = await user_role.findOne(2);
  //   const { user_id } = await users
  //     .create({
  //       oauth_uid: id,
  //       oauth_provider: provider,
  //       role: _role,
  //       user_name: username ? username : undefined,
  //       // check if a user with username exists <> if one || default to null
  //       first_name: name ? name.givenName : undefined,
  //       last_name: name ? name.familyName : undefined,
  //       email,
  //       picture_url: photos && photos[0].value,
  //       newdesignjt: true,
  //       confirmed: true,
  //     })
  //     .save();
  //
  //   user = await users.findOne(user_id, { relations: ["role"] });
  // } else if (!user.oauth_uid) {
  //   /**
  //    *  @description   Merge account || we found the user by email
  //    */
  //   user.oauth_uid = id;
  //   user.oauth_provider = provider;
  //   await user.save();
  // }
  //
  // // completed process
  // // login
  // console.log("login in");
  //

  return cb(null, {
    // ...user,
    accessToken,
    refreshToken,
    // firstTimeUser,
  });
};

export const oAuthMiddleware = {
  authenticate,
  done,
  verify_,
};
