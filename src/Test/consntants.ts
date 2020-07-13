import faker from "faker";

// Admin 1
export const a_FirstName = faker.name.firstName(1);
export const a_LastName = faker.name.lastName(1);
export const a_Email = faker.internet.email(a_FirstName, a_LastName);
export const a_Password = faker.internet.password(13);
export const a_role = 1;

// Admin 2
export const a1_FirstName = faker.name.firstName(2);
export const a1_LastName = faker.name.lastName(2);
export const a1_Email = faker.internet.email(a1_FirstName, a1_LastName);
export const a1_Password = faker.internet.password(13);
export const a1_role = 1;

// Admin 3
export const a3_FirstName = faker.name.firstName(2);
export const a3_LastName = faker.name.lastName(2);
export const a3_Email = faker.internet.email(a3_FirstName, a3_LastName);
export const a3_Password = faker.internet.password(13);
export const a3_role = 1;

// Customer 1
export const c_FirstName = faker.name.firstName(1);
export const c_LastName = faker.name.lastName(2);
export const c_Email = faker.internet.email(c_FirstName, c_LastName);
export const c_Password = faker.internet.password(13);
export const c_role = 2;

// Customer 2
export const c1_FirstName = faker.name.firstName(1);
export const c1_LastName = faker.name.lastName(2);
export const c1_Email = faker.internet.email(c1_FirstName, c1_LastName);
export const c1_Password = faker.internet.password(13);
export const c1_role = 2;

// Customer 3
export const c2_FirstName = faker.name.firstName(1);
export const c2_LastName = faker.name.lastName(2);
export const c2_Email = faker.internet.email(c2_FirstName, c2_LastName);
export const c2_Password = faker.internet.password(13);
export const c2_role = 2;

// GQL QUERIES

const regMutation = ``;
