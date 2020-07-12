import { ObjectID } from "mongodb";
import { Session } from "../../GraphQL/Utils/graphql-utile";
import { User } from "../../Database/entities/User";

// the logged_in helper finds valid user

export const logged_in_helper = async ({
  user_id,
}: Session): Promise<boolean> => {
  if (user_id) {
    const id = new ObjectID(user_id);
    const valid_user = await User.repo().findByIds([id]);
    if (valid_user.length) return true;
  }

  return false;
};
