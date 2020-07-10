import { Session } from "../../GraphQL/Utils/graphql-utile";
import { User } from "../../Database/entities/User";

// the logged_in helper finds valid user

export const logged_in_helper = async ({ user_id }: Session) => {
  if (user_id) {
    const valid_user = await User.repo().findOneOrFail(user_id);
    if (valid_user) return true;
  }

  return false;
};
