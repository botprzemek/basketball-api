import Handler from "@/server/handler";
import Model from "@/server/model";

import { NextFunction, Router } from "express";

export default class Route {
    private readonly subRouter: Router;

    constructor() {
        this.subRouter = Router();
    }

    public register = (router: Router, model: Model) => {
        const handler = new Handler(model);

        this.subRouter
            .get("/", handler.get)
            .post("/", handler.create)
            .put("/", handler.update)
            .delete("/", handler.remove)

        router.use(`/${model}`, this.subRouter);
    }
}
