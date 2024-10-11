import { NextFunction, Request, Response } from "express";
import { getToken } from "@/config/types/server";
import { failure } from "@/utils/error";
import send from "@/utils/send";

export default (
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    const key: string | string[] | undefined = request.headers["X-Api-Key"];

    if (key !== `${getToken().secret}`) {
        const error = failure({
            code: 403,
            message: "",
            status: 403,
            title: "API Key is not valid",
        });

        send(error, response);

        return;
    }

    next();
};
