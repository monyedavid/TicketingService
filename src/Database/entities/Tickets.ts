import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  MongoRepository,
  getMongoRepository,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import moment from "moment";
import { User } from "./User";
import Conn from "../../Services/connections";

interface ITicket {
  id: string | ObjectID;
  open: boolean | null;
  request: string;
  owner: string | ObjectID;
  createdDate: any;
}

interface ITicketComments {
  user_id: ObjectID; // Admin ID | Customer ID
  full_name: string;
  comment: string;
  createdAt: Date | string;
  admin: boolean; // determine if customer or admin made comment
}

interface INewTicketArgs {
  request?: string;
  owner?: User;
}

function ITFormatter(ticket: Ticket) {
  return {
    id: ticket.id,
    open: ticket.open,
    request: ticket.request,
    owner: ticket.owner.id,
    createdDate: moment(ticket.createdDate).format(),
  };
}

@Entity()
export class Ticket {
  private constructor(
    request?: string,
    owner?: User,
    comments?: ITicketComments[],
    open?: boolean
  ) {
    request ? (this.request = request) : null;
    owner ? (this.owner = owner) : null;
    comments ? (this.comments = comments) : null;
    open ? (this.open = open) : null;
  }

  @ObjectIdColumn()
  id: ObjectID;

  // Ticket - customer request
  @Column()
  request: string;

  @Column()
  owner: User;

  @Column()
  comments: ITicketComments[];

  @Column({ nullable: false, default: true })
  open: boolean;

  @Column({ nullable: false, default: new Date() })
  createdDate: Date;

  // read Tickets -- Documents filtered only by open state
  static async getEntitiesOpenFilter(open: boolean): Promise<ITicket[]> {
    const tickets = await Conn.manager().find(Ticket, { open });

    return tickets.map(ITFormatter);
  }

  // read Tickets -- Documents filtered by open state & owner id
  static async getOwnerTagEntitiesOpenFilter(
    open: boolean,
    ownerId: ObjectID
  ): Promise<ITicket[]> {
    const tickets = await Conn.manager().find(Ticket, {
      where: { "owner.id": ownerId, open },
    });

    return tickets.map(ITFormatter);
  }

  // create class access to mongo repositories
  static repo(): MongoRepository<Ticket> {
    return getMongoRepository(Ticket);
  }

  // create and insert new Ticket object'
  static async ci({ request, owner }: INewTicketArgs) {
    const ownerE = owner;
    delete ownerE["password"]; // exclude password from partial owner-User object
    const ticket = await Conn.manager().save(new Ticket(request, ownerE));

    return ITFormatter(ticket);
  }

  // create new comment
  async nc(comment: ITicketComments): Promise<boolean> {
    const pc = this.comments ? this.comments : [];

    if (pc && pc.length) {
      // this Ticket has previous comments
      // pc ! null -> pc has existing comments
      pc.push(comment);

      await this.uc(pc); // update..
      return true;
    } else {
      // this Ticket doesnt have previous comments
      if (comment.admin) {
        // comment is being made by admin
        pc.push(comment);
        await this.uc(pc);
        return true;
      } else {
        return false;
      }
    }
  }

  // update comments
  private async uc(comments: ITicketComments[]) {
    await Conn.manager().update(Ticket, { id: this.id }, { comments });
  }

  // open or close ticket
  async openOrCloseTicket() {
    // update state of ticket
    await Conn.manager().update(Ticket, { id: this.id }, { open: !this.open });
  }

  // Load Comments
  async loadComments() {
    return {
      ticketId: this.id,
      open: this.open,
      comments: this.comments,
    };
  }

  @BeforeUpdate()
  test() {
    console.log("nc update ran");
  }

  @BeforeInsert()
  updateDatesMarkOpen() {
    this.createdDate = new Date();
    this.open = true;
  }
}
