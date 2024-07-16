import Data from "@/services/data";
import Resource from "@/models/resource";
import Route from "@/server/router/route";

import express, { Router as RouterInstance, RouterOptions } from "express";

export default class Router {
    private readonly data: Data;
    private readonly router: RouterInstance;
    private readonly options: RouterOptions = {
        mergeParams: true,
    };

    constructor() {
        this.data = new Data();
        this.router = RouterInstance(this.options);

        this.router.use(express.json());

        Object.keys(Resource)
            .map(
                (resource: string) =>
                    Resource[resource as keyof typeof Resource],
            )
            .forEach(this.register);
    }

    public getInstance = (): RouterInstance => {
        return this.router;
    };

    private register = (resource: Resource): void => {
        this.router.use(
            `/${resource}`,
            new Route(resource, this.data).register(),
        );
    };
}
