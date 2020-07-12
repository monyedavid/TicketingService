import { ResolverMap } from "../../../../Utils/graphql-utile";
import LocalAuth from "../../../../../Services/user_admin_schemas/auth/local-auth/main.class";

export const resolvers: ResolverMap = {
  Query: {
    register_default: () => "nothing to see here move along",
  },

  Mutation: {
    register: async (
      _,
      args: GQL.IRegisterOnMutationArguments,
      { redis, url, session }
    ) => {
      const service = new LocalAuth(url);

      if (args.role == 1) {
        // creating admin:
        if (session.user.role == 2) {
          // !admin user
          return {
            ok: false,
            message: "un-authorized",
            status: 401,
            error: [
              {
                path: "auth",
                message: "you dont have prmission to perform this action",
              },
            ],
          };
        }
      }
      return await service.register(args, redis);
    },
  },
};
