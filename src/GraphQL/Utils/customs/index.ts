// custom types for graphql and validations
// tslint:disable-next-line:no-var-requires
const assertErr = require("assert-err");
import { GraphQLScalarType } from "graphql";
import is_region from "../../../Utils/helper/region";
import {
  ng_cs_type,
  ng_cs_depth,
  dect,
  decpr,
  delp,
  isDbConnectionName,
  isUserRole,
} from "../not_type";

function serialize_string_lowercase(value: any) {
  assertErr(
    typeof value == "string",
    TypeError,
    "Field Error: value is not string type"
  );

  return value.toLowerCase();
}

const oauth = new GraphQLScalarType({
  name: "Oauth",
  description: "OAuthentication methods on weekly reports",
  serialize: serialize_string_lowercase,
  parseValue(value: string) {
    assertErr(
      value == "google" ||
        value == "twitter" ||
        value == "facebook" ||
        value == "linkedin" ||
        value == "microsoft",
      TypeError,
      "Field Error: value is not string type"
    );
    return value;
  },
});

const Region = new GraphQLScalarType({
  name: "Region",
  description: "weekly reports registered regions/countries",
  serialize: serialize_string_lowercase,
  parseValue(value: string) {
    assertErr(
      is_region(value),
      TypeError,
      "Field error: value is an invalid Region"
    );
    return value;
  },
});

const UserRole = new GraphQLScalarType({
  name: "UserRole",
  description: "User Role(s)",
  serialize: serialize_string_lowercase,
  parseValue(value: number) {
    assertErr(
      isUserRole(value),
      TypeError,
      "Field error: expected valid user role id, got something else, refer to docs?"
    );
    return value;
  },
});

export default {
  Region,
  oauth,
  UserRole,
};
