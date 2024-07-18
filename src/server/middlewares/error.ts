import { HttpError } from "@/server/router/error";
import { NextFunction, Request, Response } from "express";

export default (
    error: HttpError,
    _request: Request,
    response: Response,
    _next: NextFunction,
): void => {
    const json: string = JSON.stringify({ error: error.getPayload() });
    const buffer: Buffer = Buffer.from(json);

    response.status(error.getPayload().code).end(buffer);
};
