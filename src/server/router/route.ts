import Data from "@/services/data";
import Handler from "@/server/handlers";
import { Method, MethodKey } from "@/models/method";

import { Router } from "express";

export default class Route {
    private readonly router: Router;
    private readonly handler: Handler;

    constructor(data: Data) {
        this.router = Router();
        this.handler = new Handler(data);
    }

    public register(path: string): Route {
        Object.keys(Method).forEach((method: string): void => {
            this.router[method as MethodKey](
                path,
                this.handler[method as MethodKey],
            );
        });

        return this;
    }

    public get(): Router {
        return this.router;
    }
}
