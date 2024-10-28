import { NextFunction, Request, Response } from "express";

export default (resource: string, action: string) =>
    (request: Request, response: Response, next: NextFunction): void => {
        if (
            request.query.resource === resource &&
            request.query.action === action
        ) {
            return next();
        }

        response.status(401).send("Unauthorized");
    };