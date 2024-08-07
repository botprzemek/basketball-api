import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "@/server/router/error";

export default (
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    if (!request.headers.authorization) {
        new UnauthorizedError(
            response,
            "Please provide a valid authorization token.",
        );
    }

    next();
};
