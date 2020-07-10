import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  MongoRepository,
} from "typeorm";
import { getMongoRepository } from "typeorm";

@Entity()
export class Ticket {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  request: string;

  @Column()
  customer: string;

  @Column()
  comments: string;

  // create class access to mongo repositories
  static _(): MongoRepository<Ticket> {
    return getMongoRepository(Ticket);
  }
}
