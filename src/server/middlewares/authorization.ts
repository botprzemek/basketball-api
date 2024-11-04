import send from "@/utils/send";
import { NextFunction, Request, Response } from "express";
import { failure } from "@/utils/error";

export default (resource: string, action: string) =>
    (request: Request, response: Response, next: NextFunction): void => {
        if (
            request.query.resource === resource &&
            request.query.action === action
        ) {
            return next();
        }

        send(
            failure({
                code: 401,
                message: "No access to resource",
                status: 401,
                title: "",
            }),
            response,
        );
    };