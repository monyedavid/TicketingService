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

import { User } from "./User";
import Conn from "../../Services/connections";

interface ITicketComments {
  user_id: ObjectID; // Admin ID | Customer ID
  full_name: string;
  comment: string;
  createdAt: Date;
  admin: boolean; // determine if customer or admin made comment
}

interface INewTicketArgs {
  request?: string;
  owner?: User;
}

@Entity()
export class Ticket {
  private constructor(
    request?: string,
    owner?: User,
    comments?: [ITicketComments],
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
  comments: [ITicketComments];

  @Column({ nullable: false, default: true })
  open: boolean;

  @Column({ nullable: false, default: new Date() })
  createdDate: Date;

  // create class access to mongo repositories
  static repo(): MongoRepository<Ticket> {
    return getMongoRepository(Ticket);
  }

  // create and insert new Ticket object'
  static async ci({ request, owner }: INewTicketArgs): Promise<Ticket> {
    return await Conn.manager().save(new Ticket(request, owner));
  }

  // create new comment
  async nc(comment: ITicketComments): Promise<boolean> {
    const pc = this.comments;

    if (pc.length) {
      // pc ! null -> pc has existing comments
      pc.push(comment);
      // update..
      await this.uc(pc);
    } else if (comment.admin) {
      // new comment by admin
      pc.push(comment);
      await this.uc(pc);
    } else return false; // attempted comment by customer

    return true;
  }

  // update comments
  private async uc(comments: [ITicketComments]) {
    const partialEntity = new Ticket(null, null, comments); // partialEntity.comments = comments;

    await Ticket.repo().update(this, partialEntity);
  }

  // open or close ticket
  async openORcloseTicket() {
    const partialEntity = new Ticket(null, null, null, !this.open); // partialEntity.open = !this.open;

    // update state of ticket
    await Ticket.repo().update(this, partialEntity);
  }

  // Load Comments
  async loadComments() {
    return {
      id: this.id,
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
