import { ResolverMap } from "../../../../Utils/graphql-utile";
import CommonAuth from "../../../../../Services/user_admin_schemas/auth/common";

export const resolvers: ResolverMap = {
  Query: {
    logout_: () => "logging out",
  },
  Mutation: {
    logout: async (_, { type }: GQL.ILogoutOnMutationArguments, { req }) => {
      const service = new CommonAuth();
      return await service.logout(req, type as any);
    },
  },
};
