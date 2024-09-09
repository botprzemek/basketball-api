import Controller from "@/controllers";
import Data from "@/services/data";
import { Method, MethodKey } from "@/models/method";

import { Router } from "express";

export default class Handler {
    private readonly controller: Controller;
    private readonly router: Router;

    constructor(data: Data, paths: string[] = ["/", "/:id"]) {
        this.router = Router();
        this.controller = new Controller(data);

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
                this.controller[method as MethodKey],
            );
        });
    };
}
