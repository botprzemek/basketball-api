import { getToken } from "@/config/types/server";
import { INVALID_TOKEN, TOKEN_NOT_FOUND } from "@/server/errors/authentication";
import send from "@/utils/send";

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default (
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    if (request.method === "OPTIONS") {
        next();
        return;
    }

    const header: string | undefined = request.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return send(TOKEN_NOT_FOUND, response);
    }

    const token: string | undefined = header.split(" ").at(1);

    if (!token) {
        return send(INVALID_TOKEN, response);
    }

    try {
        const payload = jwt.verify(token, getToken().secret);

        if (typeof payload === "string") {
            return send(INVALID_TOKEN, response);
        }

        request.user = payload.user;
    } catch (error) {
        return send(INVALID_TOKEN, response);
    }

    next();
};
