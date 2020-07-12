import { PubSub, withFilter } from "graphql-yoga";

import { ResolverMap } from "../../Utils/graphql-utile";

import { createMiddleWare } from "../../Utils/createMiddleWare";
import {
  TicketCollaboratorsMw,
  logged_in_admin as AdminLoggedInMw,
  logged_in_customer as CustomerLoggedInMw,
} from "../../Middlewares/loggedin";
import {
  PUB_SUB_RAISE_TICKET,
  PUB_SUB_REPLY_TICKET,
} from "../../../Utils/constants";
import TicketingService from "../../../Services/tickets";
import { ObjectID } from "mongodb";

/**
 * @function              Partial, curried functions
 * @param pubSub          PubSub instance
 * @param ticketId        Channel filtering
 * @param replyTicket     Payload
 */

function PublishTicketReply(
  pubSub: PubSub,
  ticketId: string,
  replyTicket: ITicketComment
) {
  pubSub.publish(PUB_SUB_REPLY_TICKET, {
    replyTicket,
    ticketId,
  });
}

/**
 * @function              Partial, curried functions
 * @param pubSub          PubSub instance
 * @param raisedTickets    interface ITicket -- Publish Data
 */

function PublishRaisedTicket(pubSub: PubSub, raisedTickets: ITicket) {
  pubSub.publish(PUB_SUB_RAISE_TICKET, {
    raisedTickets,
  });
}

export const resolvers: ResolverMap = {
  Query: {
    openTickets: createMiddleWare(
      AdminLoggedInMw,
      async (_, __, { session, middleware_result }) => {
        if (!middleware_result.ok) return middleware_result;

        const service = new TicketingService(session);
        return await service.get(true);
      }
    ),

    closedTickets: createMiddleWare(
      AdminLoggedInMw,
      async (_, __, { session, middleware_result }) => {
        if (!middleware_result.ok) return middleware_result;

        const service = new TicketingService(session);
        return await service.get();
      }
    ),

    myTickets: createMiddleWare(
      CustomerLoggedInMw,
      async (
        _,
        { state }: GQL.IMyTicketsOnQueryArguments,
        { session, middleware_result }
      ) => {
        if (!middleware_result.ok) return middleware_result;

        const service = new TicketingService(session);
        return await service.get(state);
      }
    ),

    loadTCommentHistory: createMiddleWare(
      TicketCollaboratorsMw, // will convert string Ticket ID ->> Object ID ^_^, admin(s) & ticket owner can view comment history
      async (
        _,
        { ticketId }: GQL.ILoadTCommentHistoryOnQueryArguments,
        { session, middleware_result }
      ) => {
        if (!middleware_result.ok) return middleware_result;

        const service = new TicketingService(session);
        return await service.loadComments(new ObjectID(ticketId));
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
      TicketCollaboratorsMw,
      async (
        _,
        { reply, ticketId }: GQL.IReplyTicketOnMutationArguments,
        { session, middleware_result, pubSub }
      ) => {
        if (!middleware_result.ok) return middleware_result;

        const partialPublish = PublishTicketReply.bind(null, pubSub, ticketId);

        const service = new TicketingService(session, partialPublish);

        return await service.comment(reply, new ObjectID(ticketId));
      }
    ),

    changeTicketState: createMiddleWare(
      AdminLoggedInMw,
      async (
        _,
        { ticket_id }: GQL.IChangeTicketStateOnMutationArguments,
        { middleware_result, session }
      ) => {
        if (!middleware_result.ok) return middleware_result;

        const service = new TicketingService(session);

        return await service.openClose(ticket_id);
      }
    ),
  },

  Subscription: {
    raisedTickets: {
      // by design let every-one see new raised Tickets or not????????
      subscribe: (_, __, { pubSub }) => {
        return pubSub.asyncIterator(PUB_SUB_RAISE_TICKET);
      },
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

export interface ITicketComment {
  user_id: string | ObjectID;
  full_name: string;
  comment: string;
  createdAt: any;
  admin: boolean;
}
