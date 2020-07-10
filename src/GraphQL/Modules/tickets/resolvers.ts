import { ResolverMap } from "../../Utils/graphql-utile";
import { createMiddleWare } from "../../Utils/createMiddleWare";
import loggin_middleware from "../../Middlewares/loggedin";

export const resolvers: ResolverMap = {
  Query: {
    replyTicket: createMiddleWare(
      loggin_middleware,
      async (_, { email, password }, { middleware_result }) => {
        if (!middleware_result.ok) return middleware_result;

        return middleware_result;
      }
    ),
  },
};
