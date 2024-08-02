import Data from "@/services/data";
import Handler from "@/server/handlers";
import { Method, MethodKey } from "@/models/method";

import { Router } from "express";

export default class Route {
    private readonly handler: Handler;
    private readonly router: Router;

    constructor(data: Data, paths: string[] = ["/", "/:id"]) {
        this.router = Router();
        this.handler = new Handler(data);

        paths.forEach(this.register);
    }

    public get = (): Router => {
        return this.router;
    };

    private register = (path: string): void => {
        const methods: string[] = Object.keys(Method);

        methods.forEach((method: string): void => {
            this.router[method as MethodKey](
                path,
                this.handler[method as MethodKey],
            );
        });
    };
}
