import { info } from "@/utils/logger";

import { NextFunction, Request, Response } from "express";

export default (
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    const start = performance.now();

    response.on("finish", (): void => {
        if (!request.ip) {
            return;
        }

        info(request.ip, [
            response.statusCode,
            request.method.toUpperCase(),
            request.originalUrl,
            `(${performance.now() - start}μs)`,
        ]);
    });

    next();
};
