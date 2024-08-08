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
        new UnauthorizedError(
            response,
            "Please provide a valid authorization token.",
        );

        return;
    }

    const token = header.split(" ")[1];

    if (!token) {
        new UnauthorizedError(
            response,
            "Please provide a valid authorization token.",
        );

        return;
    }

    jwt.verify(
        token,
        new Config().getTokenKey(),
        new Config().getTokenOptions(),
        (_error, _decoded) => {
            new UnauthorizedError(
                response,
                "Please provide a valid authorization token.",
            );

            return;
        },
    );

    next();
};
