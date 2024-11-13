import send from "@/utils/send";

import { Request, Response } from "express";

export const get =
    (controller: User.Find) =>
    async (_request: Request, response: Response): Promise<void> => {
        send(await controller(), response);
    };

export default {
    get,
};
