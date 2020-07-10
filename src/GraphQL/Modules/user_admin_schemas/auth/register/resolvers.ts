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
      { redis, url }
    ) => {
      const service = new LocalAuth(url);
      return await service.register(args, redis);
    },
  },
};
