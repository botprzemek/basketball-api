import Controller from "@/server/controller";
import Model from "@/server/model";

import { Request, Response } from "express";
import send from "@/server/middlewares/send";

export default class Handler {
    private readonly controller: Controller;

    constructor(model: Model) {
        this.controller = new Controller(model);
    }

    public get = async <T>(_: Request, response: Response): Promise<void> => {
        const payload: Array<T> = await this.controller.get<T>();

        response
            .setHeader("Content-Type", "application/json")
            .status(200);

        send(response, payload);
    }

    public create = async (_: Request, response: Response): Promise<void> => {
        void this.controller.create();

        response.status(201);

        send(response);
    }

    public update = async (_: Request, response: Response): Promise<void> => {
        void this.controller.update();

        response.status(204);

        send(response);
    }

    public remove = async (_: Request, response: Response): Promise<void> => {
        void this.controller.remove();

        response.status(204);

        send(response);
    }
}
