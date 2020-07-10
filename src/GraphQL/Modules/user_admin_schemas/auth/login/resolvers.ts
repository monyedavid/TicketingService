import { ResolverMap } from "../../../../Utils/graphql-utile";
import LocalAuth from "../../../../../Services/user_admin_schemas/auth/local-auth/main.class";

export const resolvers: ResolverMap = {
  Query: {
    login_default: () => "nothing to see here move along!",
  },

  Mutation: {
    login: async (
      _,
      { email, password }: GQL.ILoginOnMutationArguments,
      { redis, req, url }
    ) => {
      const service = new LocalAuth(url);

      return await service.login({ email, password }, req, redis);
    },
  },
};
