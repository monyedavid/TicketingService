import { ObjectID } from "mongodb";
import { Request } from "express-serve-static-core";
import { removeAllUserSessions } from "../../../Utils/removeAllUserSessions";
import { User } from "../../../Database/entities/User";
import {
  not_found_e,
  s_logout,
  id_not_provided_e,
  g_success,
} from "../../../Utils/constants";

import { _CommonAuth } from "../../../Types/auth.schema";
import Base from "../shared/base";
import { Session } from "../../../GraphQL/Utils/graphql-utile";

export default class CommonAuth extends Base {
  /**
   * @method           me
   * @description      return user data
   * @param session    Express.Session session object
   * @param extras     Extra data to add into return data
   */
  public async me(session: Session, extras?: any) {
    let me: User;

    try {
      const id = new ObjectID(session.user_id);
      me = (await User.repo().findByIds([id]))[0];
    } catch (error) {
      return {
        ok: false,
        message: not_found_e,
        status: 404,
        error: [
          {
            path: "me",
            message: not_found_e,
          },
        ],
      };
    }

    return {
      ok: true,
      message: g_success,
      status: 200,
      error: null,
      data: {
        ...me,
        role: me.role.role_id,
      },
    };
  }

  /**
   * @method           logout
   * @description      delete user session for all logged in devices(type: all) or current devices(type: ths)
   * @param session    {Express.Session} session object
   * @param type       {string} this or all
   */
  public async logout({ session }: Request, type: _CommonAuth.type) {
    const { user_id } = session;

    if (user_id) {
      // remove all user sessions across devices
      if (type == "all") {
        await removeAllUserSessions(user_id);
        session.destroy((err) => {
          if (err) {
            console.log(err);
          }
        });
        return {
          ok: true,
          message: s_logout,
          status: 200,
          error: null,
        };
      }
      // if no type is provided destroy the current user session
      session.destroy((err) => {
        if (err) {
          console.log(err);
        }
      });

      return {
        ok: true,
        message: s_logout,
        status: 200,
        error: null,
      };
    }

    return {
      ok: false,
      message: not_found_e,
      status: 404,
      error: [
        {
          path: "logout",
          message: id_not_provided_e,
        },
      ],
    };
  }
}

/*** NB: FOR GRAPHQL: create union of T_response and add data field
 * Promise<{
    ok: boolean;
    message: any;
    status: number;
    error: {
        path: string;
        message: string;
    }[];
    data: any[]
    }>
*/
