import { ResolverMap } from "../../../Utils/graphql-utile";

export const resolvers: ResolverMap = {
    Query: {
        oauth: (_, { type }: GQL.IOauthOnQueryArguments, { url }) => {
            if (type == "facebook")
                return {
                    ok: true,
                    status: 200,
                    path: `${url}/api/v1/oauth/facebook`,
                };

            if (type == "google")
                return {
                    ok: true,
                    status: 200,
                    path: `${url}/api/v1/oauth/google`,
                };

            if (type == "twitter")
                return {
                    ok: true,
                    status: 200,
                    path: `${url}/api/v1/oauth/twitter`,
                };

            if (type == "linkedin")
                return {
                    ok: true,
                    status: 200,
                    path: `${url}/api/v1/oauth/linkedin`,
                };

            if (type == "microsoft")
                return {
                    ok: true,
                    status: 200,
                    path: `${url}/api/v1/oauth/microsoft`,
                };

            return {
                ok: false,
                status: 404,
            };
        },
    },
};
