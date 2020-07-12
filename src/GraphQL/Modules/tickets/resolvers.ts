import { PubSub, withFilter } from "graphql-yoga";

import { ResolverMap } from "../../Utils/graphql-utile";

import { createMiddleWare } from "../../Utils/createMiddleWare";
import {
  LoadCommentsMiddleWare,
  logged_in_admin as AdminLoggedInMw,
  logged_in_customer as CustomerLoggedInMw,
} from "../../Middlewares/loggedin";
import {
  PUB_SUB_RAISE_TICKET,
  PUB_SUB_REPLY_TICKET,
} from "../../../Utils/constants";

/**
 * @function              Partial, curried functions
 * @param pubSub          PubSub instance
 * @param ticketId        Channel filtering
 * @param replyTicket     Payload
 */

function PublishtTicketReply(
  pubSub: PubSub,
  ticketId: string,
  replyTicket: GQL.ITResponse
) {
  pubSub.publish(PUB_SUB_REPLY_TICKET, {
    replyTicket,
    ticketId,
  });
}

/**
 * @function              Partial, curried functions
 * @param pubSub          PubSub instance
 * @param ticketId        Channel filtering
 * @param raiseTicket     Payload
 */

function PublishtRaisedTicket(
  pubSub: PubSub,
  ticketId: string,
  raiseTicket: GQL.ITResponse
) {
  pubSub.publish(PUB_SUB_RAISE_TICKET, {
    raiseTicket,
    ticketId,
  });
}

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

  Mutation: {
    raiseTicket: createMiddleWare(
      CustomerLoggedInMw,
      async (
        _,
        { request }: GQL.IRaiseTicketOnMutationArguments,
        { middleware_result }
      ) => {
        if (!middleware_result.ok) return middleware_result;

        return middleware_result;
      }
    ),

    replyTicket: createMiddleWare(
      CustomerLoggedInMw,
      async (
        _,
        { reply, ticketId }: GQL.IReplyTicketOnMutationArguments,
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
        (_, __, { pubSub }) => pubSub.asyncIterator(PUB_SUB_REPLY_TICKET),
        (payload, variables) => {
          return payload.ticketId === variables.ticketId;
        }
      ),
    },
  },
};
