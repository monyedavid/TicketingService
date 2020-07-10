import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  getMongoRepository,
  MongoRepository,
} from "typeorm";

@Entity()
export class Role {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  role_id: number;

  @Column()
  role: string;

  // create class access to mongo repositories
  static _(): MongoRepository<Role> {
    return getMongoRepository(Role);
  }
}
