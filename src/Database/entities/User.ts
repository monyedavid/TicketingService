import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  getMongoRepository,
  MongoRepository,
} from "typeorm";
import { Role } from "./Role";

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  confirmed: boolean;

  @Column()
  forgotPasswordLock: boolean;

  @Column()
  phone_number: string;

  @Column()
  photo: string;

  @Column((type) => Role)
  role: Role;

  // create class access to mongo repositories
  static _(): MongoRepository<User> {
    return getMongoRepository(User);
  }
}
