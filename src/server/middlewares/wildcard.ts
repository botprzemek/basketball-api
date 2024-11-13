import { send } from "@/utils/send";
import { wrapper } from "@/utils/wrapper";

import { Request, Response } from "express";

export default (_request: Request, response: Response): void =>
    send(
        wrapper({
            status: 404,
            message: "Resource not found",
        }),
        response,
    );
