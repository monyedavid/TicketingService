import { ResolverMap } from "../../../Utils/graphql-utile";

// define abstracts right here
export const resolvers: ResolverMap = {
    me_union: {
        __resolveType: obj => {
            if (obj.data) {
                return "me";
            }

            return "T_response";
        }
    }
};
