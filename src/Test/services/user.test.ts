// Test Local Auth Services (＃°Д°)

import LocalAuth from "../../Services/user_admin_schemas/auth/local-auth/main.class";

jest.setTimeout(3000000);

import Conn from "../../Services/connections";
import { Connection } from "typeorm";
import { redis } from "../../Services/cache";
import {
  a1_Email,
  a1_FirstName,
  a1_LastName,
  a1_Password,
  a1_role,
} from "../consntants";

let conn: Connection;
let service: LocalAuth;

const args = {
  first_name: a1_FirstName,
  last_name: a1_LastName,
  email: a1_Email,
  role: a1_role,
  password: a1_Password,
};
beforeAll(async () => {
  conn = await Conn.createTestConn(); // establish mongo connection
  service = new LocalAuth();
});

afterAll(async () => {
  await conn.close();
});

// Test A

describe("@Entity User service", () => {
  // Register suite duplicate email verification depends on create new user suite
  describe("Register", () => {
    test("validate email", async () => {
      const response = await service.register(
        { ...args, email: "jamaicgmail.com" },
        redis
      );

      expect(response).toStrictEqual({
        ok: false,
        message: "registration schema validation",
        status: 400,
        error: [
          {
            path: "email",
            message: "email must be a valid email",
          },
        ],
      });
    });

    test("validate password", async () => {
      const response = await service.register(
        { ...args, password: "1234" },
        redis
      );

      expect(response).toStrictEqual({
        ok: false,
        message: "registration schema validation",
        status: 400,
        error: [
          {
            path: "password",
            message: "password must be at least 7 characters",
          },
        ],
      });
    });

    test("create new user", async () => {
      const response = await service.register(args, redis);

      expect(response).toStrictEqual({
        ok: true,
        message: null,
        status: 200,
        error: null,
      });
    });

    test("duplicate email verification", async () => {
      const response = await service.register(args, redis);

      expect(response).toStrictEqual({
        ok: false,
        message: null,
        status: 403,
        error: [
          {
            path: "email",
            message: "Email already taken",
          },
        ],
      });
    });
  });

  describe("Login", () => {});
});
