import Handler from "@/handlers";
import Resource from "@/models/resource";

import { Router } from "express";
import Data from "@/services/data";

export default class Route {
    private readonly children: Router;
    private readonly data: Data;
    private readonly resource: Resource;

    constructor(resource: Resource, data: Data) {
        this.children = Router();
        this.data = data;
        this.resource = resource;

        this.register();
    }

    public getInstance = (): Router => {
        return this.children;
    };

    private register = (): void => {
        const handler: Handler = new Handler(this.resource, this.data);

        this.children
            .get("/", handler.get)
            .post("/", handler.post)
            .put("/", handler.put)
            .delete("/", handler.delete);
    };
}
