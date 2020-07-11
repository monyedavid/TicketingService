import { ResolverMap } from "../../Utils/graphql-utile";
import { createMiddleWare } from "../../Utils/createMiddleWare";
import CustomerLoggedInMw, {
  logged_in_admin as AdminLoggedInMw,
} from "../../Middlewares/loggedin";

export const resolvers: ResolverMap = {
  Query: {
    openTickets: createMiddleWare(
      AdminLoggedInMw,
      async (_, __, { middleware_result }) => {
        if (!middleware_result.ok) return middleware_result;

        return middleware_result;
      }
    ),

    closedTickets: createMiddleWare(
      AdminLoggedInMw,
      async (_, __, { middleware_result }) => {
        if (!middleware_result.ok) return middleware_result;

        return middleware_result;
      }
    ),

    myTickets: createMiddleWare(
      CustomerLoggedInMw,
      async (_, __, { middleware_result }) => {
        if (!middleware_result.ok) return middleware_result;

        return middleware_result;
      }
    ),
  },
};
