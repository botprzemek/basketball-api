import { NextFunction, Request, Response } from "express";

export default (
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    const start: Date = new Date();

    response.on("finish", (): void => {
        console.log(
            request.ip,
            `[${start.toLocaleString("pl-PL").replace(", ", "-")}]`,
            request.method.toUpperCase(),
            request.originalUrl,
            `(${new Date().getTime() - start.getTime()}ms)`,
        );
    });

    next();
};
