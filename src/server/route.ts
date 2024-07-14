import Handler from "@/server/handler";

import { Router } from "express";

export default class Route {
    private readonly children: Router;
    private readonly options: any;

    constructor(options: any) {
        this.children = Router();
        this.options = options;

        this.register();
    }

    public get = (): Router => {
        return this.children;
    };

    private register = () => {
        const handler = new Handler(this.options);

        this.children
            .get("/", handler.get)
            .post("/", handler.post)
            .put("/", handler.put)
            .delete("/", handler.delete);
    };
}
