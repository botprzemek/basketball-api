import logger from "@/utils/logger";

import { NextFunction, Request, Response } from "express";

export default (
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    const start: Date = new Date();

    response.on("finish", (): void => {
        if (!request.ip) {
            return;
        }

        logger.info(request.ip, [
            response.statusCode,
            request.method.toUpperCase(),
            request.originalUrl,
            `(${new Date().getTime() - start.getTime()}ms)`,
        ]);
    });

    next();
};
