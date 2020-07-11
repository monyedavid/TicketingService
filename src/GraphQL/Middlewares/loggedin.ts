import { Resolver, Context } from "../Utils/graphql-utile";
import { logged_in_helper } from "../../Utils/helper/loggedin_helper";

/**
 * @default         middleware function
 * @description     Middleware to check if valid session & user is attched to request
 * @param resolver  type Resolver
 * @param parent    any
 * @param args      Mutation or Query Arguments
 * @param context   interface Context, define context of graphql context
 * @param info      any
 */

export default async (
  resolver: Resolver,
  parent: any,
  args: any,
  context: Context,
  info: any
) => {
  const { session } = context;

  if (await logged_in_helper(session)) {
    if (session.user.role == 2)
      return await resolver(
        parent,
        args,
        {
          ...context,
          middleware_result: {
            ok: true,
            message: "valid customer - found",
            status: 200,
            error: null,
          },
        },
        info
      );
  }

  return await resolver(
    parent,
    args,
    {
      ...context,
      middleware_result: {
        ok: false,
        message: "protected route",
        status: 401,
        error: [
          {
            path: "login",
            message:
              "no customer - user detected, re-authenticate and try again",
          },
        ],
      },
    },
    info
  );
};

export const logged_in_admin = async (
  resolver: Resolver,
  parent: any,
  args: any,
  context: Context,
  info: any
) => {
  const { session } = context;

  if (await logged_in_helper(session)) {
    if (session.user.role == 1)
      return await resolver(
        parent,
        args,
        {
          ...context,
          middleware_result: {
            ok: true,
            message: "valid admin found",
            status: 200,
            error: null,
          },
        },
        info
      );
  }

  return await resolver(
    parent,
    args,
    {
      ...context,
      middleware_result: {
        ok: false,
        message: "protected route",
        status: 401,
        error: [
          {
            path: "login",
            message: "no admin user detected, authenticate and try again",
          },
        ],
      },
    },
    info
  );
};

export const admin_or_owner = async (
  resolver: Resolver,
  parent: any,
  args: any,
  context: Context,
  info: any
) => {};

/**
 *  ok: boolean,
 *   message: string,
 *   status: number,
 *   error: {path: string, message: string}[]
 *   ]
 */
