import Config from "@/config/server";
import { Unauthorized } from "@/server/router/error";

import { NextFunction, Request, Response } from "express";

export default (
    request: Request,
    _response: Response,
    next: NextFunction,
): void => {
    const key: string | undefined = request.get("X-Api-Key");

    if (key === new Config().getApiKey()) {
        return next();
    }

    throw new Unauthorized("Please provide a valid API Key.");
};
