import { send, wrap } from "@/server/data";

import { Request, Response } from "express";

export default (_request: Request, response: Response): void =>
    send(
        wrap({
            status: 404,
            message: "Resource not found",
        }),
        response,
    );
