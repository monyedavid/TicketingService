import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  MongoRepository,
  getMongoRepository,
} from "typeorm";

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
  static repo(): MongoRepository<Ticket> {
    return getMongoRepository(Ticket);
  }
}
