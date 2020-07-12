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
import TicketingService from "../../../Services/tickets";
import { ObjectID } from "typeorm";

/**
 * @function              Partial, curried functions
 * @param pubSub          PubSub instance
 * @param ticketId        Channel filtering
 * @param replyTicket     Payload
 */

function PublishtTicketReply(
  pubSub: PubSub,
  ticketId: string,
  replyTicket: IITicketComment
) {
  pubSub.publish(PUB_SUB_REPLY_TICKET, {
    replyTicket,
    ticketId,
  });
}

/**
 * @function              Partial, curried functions
 * @param pubSub          PubSub instance
 * @param raiseTicket     Payload
 */

function PublishRaisedTicket(pubSub: PubSub, raiseTicket: ITicket) {
  pubSub.publish(PUB_SUB_RAISE_TICKET, {
    raiseTicket,
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
        { middleware_result, pubSub, session }
      ) => {
        if (!middleware_result.ok) return middleware_result;

        const partialPublish = PublishRaisedTicket.bind(null, pubSub);

        const service = new TicketingService(session, partialPublish);

        return await service.create(request);
      }
    ),

    replyTicket: createMiddleWare(
      CustomerLoggedInMw,
      async (
        _,
        { reply, ticketId }: GQL.IReplyTicketOnMutationArguments,
        { middleware_result, pubSub }
      ) => {
        if (!middleware_result.ok) return middleware_result;

        const partialPublish = PublishtTicketReply.bind(null, pubSub, ticketId);

        return middleware_result;
      }
    ),
  },

  Subscription: {
    raisedTickets: {
      // by design let every-one see new raised Tickets or not????????
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

export interface ITicket {
  id: string | ObjectID;
  open: boolean | null;
  request: string;
  owner: string | ObjectID;
  createdDate: any;
}

export interface IITicketComment {
  user_id: string | ObjectID;
  full_name: string;
  comment: string;
  createdAt: any;
  admin: boolean;
}
