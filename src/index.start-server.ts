import "reflect-metadata";
import "dotenv/config";
import Blob from "cross-blob";

globalThis.Blob = Blob;

import { default as session } from "express-session";
import connectRedis from "connect-redis";
// import * as RateLimit from "express-rate-limit";
import { initialize } from "passport";
import api_v1 from "./Api/v1";
import { GraphQLServer } from "graphql-yoga";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { subRedis, redis, pubRedis } from "./Services/cache";
import { GenSchema } from "./GraphQL/Utils/generateSchema";
// TYPE-ORM
import { Connection } from "typeorm";

import { confirmEmail } from "./Api/Controllers/confirmEmail";
// import { googleOauthConfig } from "./Services/_user-and-administrative-schema/auth/o-auth/google";
// import { oAuthMiddleware } from "./Services/_user-and-administrative-schema/auth/o-auth/middleware";

import V1_ApiRoutes from "./Api/Contracts/v1/ApiRoutes";
import GraphQLogger from "./Utils/log/request-logger";
import {
  redisessionprefix,
  serverName,
  serverMessage,
  inProd,
} from "./Utils/constants";

import Static_ApiRoutes from "./Api/Contracts/static";
import Connections_ from "./Services/connections";

const RedisStore = connectRedis(session);
const sessionSecret = process.env.SESSION_SECRET as string;
const v1 = new V1_ApiRoutes();
const static_routes = new Static_ApiRoutes();

// const apiLimiter = RateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100
// });

// const createAccountLimiter = RateLimit({
//     windowMs: 60 * 60 * 1000, // 1 hour window
//     max: 5, // start blocking after 5 requests
//     message:
//         "Too many accounts created from this IP, please try again after an hour"
// });

export const startServer = async () => {
  const pubSub = new RedisPubSub({
    publisher: pubRedis,
    subscriber: subRedis,
  });

  const server = new GraphQLServer({
    schema: GenSchema(),
    context: ({ request, response }) => ({
      redis,
      url: request ? request.protocol + "://" + request.get("host") : "",
      session: request ? request.session : "",
      res: response,
      req: request,
      request_origin: request ? request.headers.origin : "", //  [header: string]: string | string[] | undefined;
      pubSub,
    }),
  });

  /**
   * @desc  CREATE TYPE-ORM CONNECTION BASED ON PROCESS.ENV{SETUP TEST DEV DB}
   */
  const conn: Connection = await Connections_.createTypeOrmConnection();

  console.log(conn, "<- conn");

  /**
   * @description   GraphQl Server Logger
   * GraphQLogger(server);
   */

  /**
   * @description  Session redis config
   */
  server.express.set("trust proxy", 1); // trust first proxy
  server.express.use(
    session({
      store: new RedisStore({
        client: redis as any,
        prefix: redisessionprefix,
      }),
      name: serverName,
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: !inProd,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false,
      },
    })
  );

  /**
   * @desc   Initialize passport
   */
  server.express.use(initialize());

  /**
   * @description  OAUTH || GOOGLE
   */
  // await googleOauthConfig(conn);

  /**
   * @desc   Initialize the REST-API version of wrn-server "/api/v1"
   */
  server.express.use(v1.Base, api_v1);

  /**
   * @desc   Email Confirmation
   */
  server.express // GRAPHQL EXPRESS SERVER SETUP
    .get(v1.confirmEmail, confirmEmail);

  // Handle Google O- Auth: "/api/v1/oauth/google" : "/auth/google/callback"
  // server.express.get(
  //   static_routes.oauth_callback().google,
  //   oAuthMiddleware.authenticate(google),
  //   (req, res) => {
  //     oAuthMiddleware.done(req, res);
  //   }
  // );

  const port = process.env.PORT || 5500;
  const app = await server.start({
    cors: {
      credentials: true,
      origin: /.*/,
    },
    port,
    playground: "/playground",
  });

  // for fs-capacitor resolution:  "fs-capacitor": "3.0.0" @ "graphql-yoga": "^1.18.3",
  function shutdown() {
    // Any sync or async graceful shutdown procedures can be run before exiting…
    process.exit(0);
  } // file upload services????

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
  process.on("SIGHUP", shutdown);

  console.log(`${serverMessage}:${port}`);
  return app;
};
