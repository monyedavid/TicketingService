import { PubSub, withFilter } from "graphql-yoga";

import { ResolverMap } from "../../Utils/graphql-utile";

import { createMiddleWare } from "../../Utils/createMiddleWare";
import CustomerLoggedInMw, {
  LoadCommentsMiddleWare,
  logged_in_admin as AdminLoggedInMw,
} from "../../Middlewares/loggedin";
import { PUB_SUB_RAISE_TICKET } from "../../../Utils/constants";

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

    loadTCommentHistory: createMiddleWare(
      LoadCommentsMiddleWare, // will convert string Ticket ID ->> Object ID ^_^, admin(s) & ticket owner can view comment history
      async (
        _,
        { ticketId }: GQL.ILoadTCommentHistoryOnQueryArguments,
        { middleware_result }
      ) => {
        if (!middleware_result.ok) return middleware_result;

        return middleware_result;
      }
    ),
  },

  Subscription: {
    raisedTickets: {
      subscribe: (_, __, { pubSub }) =>
        pubSub.asyncIterator(PUB_SUB_RAISE_TICKET),
    },

    replyTicket: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator(PUB_SUB_RAISE_TICKET),
        (payload, variables) => {
          return payload.queryId === variables.queryId;
        }
      ),
    },
  },
};
