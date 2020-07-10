import * as b_crypt from "bcryptjs";

import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  getMongoRepository,
  MongoRepository,
  BeforeInsert,
} from "typeorm";
import { Role } from "./Role";
import Conn from "../../Services/connections";

interface IUserConstructorArgs {
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
  password: string;
  photo?: string;
  phone_number?: string;
}

@Entity()
export class User {
  private constructor(
    first_name: string,
    last_name: string,
    email: string,
    role: Role,
    password: string,
    photo?: string,
    phone_number?: string
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.password = password;
    this.email = email;
    this.phone_number = phone_number;
    this.photo = photo;
    this.role = role;
  }

  @ObjectIdColumn()
  id: ObjectID;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false, default: false })
  confirmed: boolean;

  @Column({ nullable: false, default: false })
  forgotPasswordLock: boolean;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  photo: string;

  @Column((type) => Role)
  role: Role;

  @Column({ nullable: false, default: new Date() })
  createdDate: Date;

  // create class access to mongo repositories
  static repo(): MongoRepository<User> {
    return getMongoRepository(User);
  }

  // create and insert new user object
  static async ci({
    first_name,
    last_name,
    email,
    role,
    photo,
    password,
    phone_number,
  }: IUserConstructorArgs): Promise<User> {
    return await Conn.manager().save(
      new User(
        first_name,
        last_name,
        email,
        role,
        password,
        photo,
        phone_number
      )
    );
  }

  // verify user instance password
  async verify(password: string) {
    return await b_crypt.compare(password, this.password);
  }

  @BeforeInsert()
  updateDates() {
    this.createdDate = new Date();
  }

  @BeforeInsert()
  async hashedPassword(): Promise<void> {
    if (this.password) {
      this.password = await b_crypt.hash(this.password, 10);
    }
  }
}
