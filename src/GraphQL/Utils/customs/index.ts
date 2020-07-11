// custom types for graphql and validations
// tslint:disable-next-line:no-var-requires
const assertErr = require("assert-err");
import { GraphQLScalarType } from "graphql";

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

export default {
  oauth,
};
