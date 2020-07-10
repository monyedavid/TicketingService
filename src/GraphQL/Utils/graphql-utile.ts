import { Redis } from "ioredis";
import { Request, Response } from "express-serve-static-core";
import { PubSub } from "graphql-yoga";

interface session_user {
  first_name: string;
  last_name: string;
  role: number;
  email: string;
  phone_number: string;
}

export interface Session extends Express.Session {
  user_id?: string;
  user?: session_user;
}

interface middleware_result {
  ok: boolean;
  message?: string;
  status: number;
  error?: {
    path: string;
    message: string;
  }[];
}

export interface Context {
  redis: Redis;
  url: string;
  session: Session;
  res: Response;
  req: Request;
  request_origin: string | string[] | undefined;
  middleware_result?: middleware_result;
  pubSub: PubSub;
}

export type Resolver = (
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export type GRAQPHQLmiddlewareFunc = (
  resolver: Resolver,
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver | { [key: string]: Resolver };
  };
}
