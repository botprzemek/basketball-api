import { failure } from "@/utils/error";
import send from "@/utils/send";

import { Request, Response } from "express";

export default (_request: Request, response: Response): void =>
    send(
        failure({
            code: 404,
            message: "Resource not found",
            status: 404,
            title: "",
        }),
        response,
    );
