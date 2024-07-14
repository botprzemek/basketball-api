import Resource from "@/server/resource";
import Route from "@/server/route";

import express, { Router as RouterInstance, RouterOptions } from "express";

export default class Router {
    private readonly router: RouterInstance;
    private readonly options: RouterOptions = {
        mergeParams: true,
    };

    constructor() {
        this.router = RouterInstance(this.options);

        this.router.use(express.json());

        Object.keys(Resource)
            .map(
                (resource: string) =>
                    Resource[resource as keyof typeof Resource],
            )
            .forEach(this.register);
    }

    public get = (): RouterInstance => {
        return this.router;
    };

    private register = (resource: Resource): void => {
        this.router.use(
            `/${resource}`,
            new Route({ resource, useCompression: true }).get(),
        );
    };
}
