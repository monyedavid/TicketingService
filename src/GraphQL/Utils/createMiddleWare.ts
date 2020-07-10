import { Resolver, GRAQPHQLmiddlewareFunc } from "./graphql-utile";

export const createMiddleWare = (
    middlewareFunc: GRAQPHQLmiddlewareFunc,
    resolverFunc: Resolver
) => (parent: any, args: any, context: any, info: any) =>
    middlewareFunc(resolverFunc, parent, args, context, info);
