// passport initialize
import { use as passport_use } from "passport";
import * as google from "passport-google-oauth20";
import { Connection } from "typeorm";
import { oAuthMiddleware } from "../middleware";

export const googleOauthConfig = async (conn: Connection[]) => {
    passport_use(
        new google.Strategy(
            {
                clientID: process.env.GOOGLE_CLIENTID as string,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, // process.env.TWITTER_API_SECRET_KEY as string,
                callbackURL:
                    process.env.NODE_ENV === "production"
                        ? (process.env.GOOGLE_CALLBACK_PROD as string)
                        : (process.env.GOOGLE_CALLBACK_DEV as string),
            },
            async (accessToken, refreshToken, profile, cb) =>
                oAuthMiddleware.verify_(
                    { accessToken, refreshToken, profile, cb },
                    conn
                )
        )
    );
};
