import { Request, Response, NextFunction } from "express-serve-static-core";
import { logged_in_helper } from "../../Utils/helper/loggedin_helper";

/**
 *
 * @param {session}  Express.Session
 * @param res        Express.Response
 * @param next       Express.NextFunction
 */

/* eslint-disable no-unused-vars */
export const is_logged_in = async (
    { session }: Request,
    res: Response,
    next: NextFunction
) => {
    /* eslint-enable no-unused-vars */
    if (await logged_in_helper(session)) {
        return next(); // continue down the router func
    }

    return res.status(401).json({
        ok: false,
        message: "protected route",
        status: 401,
        error: [
            {
                path: "login",
                message: "no user decteted, authentiacte and try again",
            },
        ],
    });

    // const error = new Error(`protected route, un-authorized request`);
    //  next(error);
};
