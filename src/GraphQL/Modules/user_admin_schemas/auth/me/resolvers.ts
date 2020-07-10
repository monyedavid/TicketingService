import { ResolverMap } from "../../../../Utils/graphql-utile";
import { createMiddleWare } from "../../../../Utils/createMiddleWare";
// check for valid user
import loggedin_middleware from "../../../../Middlewares/loggedin";
import CommonAuth from "../../../../../Services/user_admin_schemas/auth/common";

export const resolvers: ResolverMap = {
  Query: {
    me: createMiddleWare(
      loggedin_middleware, // user must be logged in
      async (_, __, { middleware_result, session }) => {
        if (!middleware_result.ok) return middleware_result;

        const service = new CommonAuth();
        return await service.me(session);
      }
    ),
  },
};
