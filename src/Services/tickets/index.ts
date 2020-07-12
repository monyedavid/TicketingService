// Provide Service for interacting with the Tickets Table for GraphQL & Rest
import { User } from "../../Database/entities/User";
import { Session } from "../../GraphQL/Utils/graphql-utile";
import {
  ITicket,
  ITicketComment,
} from "../../GraphQL/Modules/tickets/resolvers";
import { Ticket } from "../../Database/entities/Tickets";
import { ObjectID } from "mongodb";

export default class TicketingService {
  /**
   * @param session  Session Data
   * @param gcf      Partially applied function -- publish result
   * @param rcf
   */
  constructor(session: Session, gcf?: GCF, rcf?: any) {
    this.gcf = gcf;
    this.rcf = rcf;
    this.session = session;
  }

  async get(
    state: boolean = false
  ): Promise<{
    ok: boolean;
    message?: string;
    status: number;
    error?: {
      path: string;
      message: string;
    }[];
    tickets?: ITicket[];
  }> {
    if (this.session.user.role == 1) {
      // Admin return all Tickets in Entry | open/closed
      return {
        ok: true,
        message: `${state ? "open" : "closed"} tickets`,
        status: 200,
        tickets: await Ticket.getEntitiesOpenFilter(state),
      };
    }

    // Customer ->> return all Tickets associated with user_id | open/closed
    return {
      ok: true,
      message: `${state ? "open" : "closed"} tickets`,
      status: 200,
      tickets: await Ticket.getOwnerTagEntitiesOpenFilter(
        state,
        new ObjectID(this.session.user_id)
      ),
    };
  }

  async create(
    request: string
  ): Promise<{
    ok: boolean;
    message?: string;
    status: number;
    error?: {
      path: string;
      message: string;
    }[];
  }> {
    // find user -- guaranteed to exist
    const user = await User.repo().findOne({ email: this.session.user.email });

    // create ticket
    const ticket_pb_data = await Ticket.ci({ request, owner: user });

    // publish -- to channel
    this.gcf ? this.gcf({ ...ticket_pb_data }) : null;

    return { ok: true, status: 200, message: "ticket has been raised" };
  }

  async comment(
    reply: string,
    ticketId: ObjectID
  ): Promise<{
    ok: boolean;
    message?: string;
    status: number;
    error?: {
      path: string;
      message: string;
    }[];
  }> {
    // find user -- guaranteed to exist
    const user = await User.repo().findOne({ email: this.session.user.email });

    const ticket = (await Ticket.repo().findByIds([ticketId]))[0];

    const postedComment = await ticket.nc({
      user_id: new ObjectID(this.session.user_id),
      admin: this.session.user.role == 1,
      comment: reply,
      createdAt: new Date(),
      full_name: this.session.user.first_name + this.session.user.last_name,
    });

    if (postedComment) {
      return { ok: true, message: "success", status: 200 };
    } else {
      return {
        ok: false,
        message: "failed to post comment",
        status: 405,
        error: [
          {
            path: "comment",
            message: "you are not allowed to leave comment at this time",
          },
        ],
      };
    }
  }

  async loadComments() {}

  /**
   * @param id     Ticket ID
   * @description  Admin ECA: open / close ticket(cannot be commented on)
   */
  async openClose(
    id: string
  ): Promise<{
    ok: boolean;
    message?: string;
    status: number;
    error?: {
      path: string;
      message: string;
    }[];
  }> {
    const tickets = await Ticket.repo().findByIds([new ObjectID(id)]);

    if (tickets.length) {
      const ticket = tickets[0];

      await ticket.openOrCloseTicket(); // close if open, open if close ༼ つ ◕_◕ ༽つ
      return {
        ok: true,
        message: `successfully ${ticket.open ? "closed" : "opened"} ticket @ ${
          ticket.id
        }`,
        status: 200,
      };
    }

    return {
      ok: false,
      message: "Ticket not found",
      status: 401,
      error: [
        {
          path: "ticket status",
          message: "Ticket not Found",
        },
      ],
    };
  }

  gcf: GCF;
  rcf: any;
  session: Session; // current user session
}

export type GCF = (publishPayload: ITicket | ITicketComment) => any;
