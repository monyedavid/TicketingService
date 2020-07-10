import { default as morgan } from "morgan";
import * as bp from "body-parser";
import { default as moment } from "moment";
import { v4 } from "uuid";
import { Request, NextFunction, Response } from "express-serve-static-core";
import { GraphQLServer } from "graphql-yoga";

export default function (server: GraphQLServer) {
    /**
     * @description  Body Parser fo GraphQl Query Logs
     */
    server.express.use(bp.urlencoded({ extended: false }));
    server.express.use(bp.json());

    /**
     * @description  Body Parser fo GraphQl Query Logs
     */
    server.express.use(bp.urlencoded({ extended: false }));
    server.express.use(bp.json());

    /**
     * @description  Log incoming server requst
     */

    server.express.use(
        morgan("dev", { immediate: true }),
        (req: Request, _, next: NextFunction) => {
            if (
                process.env.server_location == "testing" &&
                req.originalUrl == "/"
            )
                if (req.method == "POST") {
                    const glh = v4();
                    // only perform rigorous logs in testing(development) environment
                    // remove all introspection query logs
                    if (req.body.operationName != "IntrospectionQuery") {
                        console.log("query and variables \n");

                        console.log(req.body);

                        console.log(
                            `recieved glh@${glh}:`,
                            moment().format("MMMM Do YYYY, h:mm:ss a")
                        );
                        // assign glh in request for identification
                        (req as any).glh = glh;
                    }
                }

            // carry on
            next();
        }
    );

    /**
     * @description  Log server response
     */

    server.express.use(
        morgan("dev"),
        (req: Request, res: Response, next: NextFunction) => {
            if (
                process.env.server_location == "testing" &&
                req.originalUrl == "/"
            )
                if (req.method == "POST" && (req as any).glh) {
                    console.log(`responded to glh@${(req as any).glh}`);
                }

            // carry on
            next();
        }
    );
}
