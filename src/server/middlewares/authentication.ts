import Config from "@/config/server";
import { UnauthorizedError } from "@/server/router/error";

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default (
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    const cookies = request.cookies;

    if (!cookies) {
        new UnauthorizedError(response, "Please provide a valid access token.");
        return;
    }

    const accessToken: string | undefined = cookies.access_token;

    if (!accessToken) {
        new UnauthorizedError(response, "Please provide a valid access token.");
        return;
    }

    try {
        jwt.verify(
            accessToken,
            new Config().getTokenSecret(),
            new Config().getTokenOptions(),
        );
    } catch (error) {
        new UnauthorizedError(response, "Please provide a valid access token.");

        return;
    }

    next();
};
