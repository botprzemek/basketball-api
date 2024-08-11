import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "@/server/router/error";

import jwt from "jsonwebtoken";
import Config from "@/config/server";

export default (
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    const header: string | undefined = request.headers.authorization;

    if (!header) {
        new UnauthorizedError(response, "Please provide a valid access token.");

        return;
    }

    const token = header.split(" ")[1];

    if (!token) {
        new UnauthorizedError(response, "Please provide a valid access token.");

        return;
    }

    jwt.verify(
        token,
        new Config().getTokenSecret(),
        new Config().getTokenOptions(),
        (error, _decoded) => {
            if (!error) {
                return;
            }

            new UnauthorizedError(
                response,
                "Please provide a valid access token.",
            );
        },
    );

    next();
};
