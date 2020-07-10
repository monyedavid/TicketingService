/**
 *
 * @param user_    users Entity
 * @description    given a users return some selected fields for sessions
 */
import { User } from "../Database/entities/User";

export const gsd = (user_: User) => {
  return {
    first_name: user_.first_name,
    role: user_.role.role_id,
    last_name: user_.last_name,
    email: user_.email,
    phone_number: user_.phone_number,
  };
};
