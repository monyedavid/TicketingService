// Test User Entity class methods

import { User } from "../../Database/entities/User";

beforeAll(async () => {
  console.log(await User.repo().findAndCount());
});

jest.setTimeout(3000000);

// Test A
test("validate email", async () => {
  expect(1).toBe(1);
});

describe("@Entity User service", () => {
  describe("Register", () => {
    test("validate password", async () => {});

    test("create new User", async () => {});

    test("duplicate email verification", async () => {});
  });

  describe("Login", () => {});
});
