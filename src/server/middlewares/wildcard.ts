import { send } from "@/server/handlers";
import { wrapper } from "@/utils/data";

import { Request, Response } from "express";

export default (_request: Request, response: Response): void =>
    // TODO
    // Error handling
    send(
        wrapper({
            status: 404,
            message: "Resource not found",
        }),
        response,
    );
