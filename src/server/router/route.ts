import Data from "@/services/data";
import Handler from "@/handlers";
import Resource from "@/models/resource";

import { Router } from "express";

export default class Route {
    private readonly data: Data;
    private readonly resource: Resource;

    constructor(resource: Resource, data: Data) {
        this.data = data;
        this.resource = resource;
    }

    public register = (): Router => {
        const handler: Handler = new Handler(this.resource, this.data);

        return Router()
            .get("/", handler.get)
            .post("/", handler.post)
            .put("/", handler.put)
            .delete("/", handler.delete);
    };
}
