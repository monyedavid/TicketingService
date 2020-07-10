import { Request, Response, NextFunction } from "express-serve-static-core";

/**
 *
 * @param req    Express.Request
 * @param res    Express.Response
 * @param next   Express.NextFunction
 */

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
};

/**
 * @param err    error message
 * @param _      Express.Request
 * @param res    Express.Response
 * @param __     Express.NextFunction
 */
/* eslint-disable no-unused-vars */
export const errorHandler = (
    err: any,
    _: Request,
    res: Response,
    __: NextFunction
) => {
    /* eslint-enable no-unused-vars */
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    });
};
