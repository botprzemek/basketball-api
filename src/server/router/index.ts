import Data from "@/services/data";
import Resources from "@/server/router/resources";

import { Router as RouterInstance, RouterOptions } from "express";

export default class Router {
    private readonly data: Data;
    private readonly router: RouterInstance;
    private readonly options: RouterOptions = {
        mergeParams: true,
    };

    constructor() {
        this.data = new Data();
        this.router = RouterInstance(this.options);

        this.register();
    }

    public get = (): RouterInstance => {
        return this.router;
    };

    private register = (): void => {
        Object.keys(Resources).forEach((resource: string): void => {
            this.router.use(
                `/${resource}`,
                Resources[resource as keyof typeof Resources](this.data),
            );
        });
    };
}
