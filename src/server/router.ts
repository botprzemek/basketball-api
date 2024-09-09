import Authentication from "@/middlewares/authentication";
import Data from "@/services/data";
import Handler from "@/server";

import { Router as RouterInstance, RouterOptions } from "express";

export default class Router {
    private readonly data: Data;
    private readonly router: RouterInstance;

    constructor(options: RouterOptions) {
        this.data = new Data();
        this.router = RouterInstance(options);

        // this.router.post(
        //     "/auth/register",
        //     new AuthenticationHandler(this.data).register,
        // );
        // this.router.post(
        //     "/auth/login",
        //     new AuthenticationHandler(this.data).login,
        // );
        // this.router.get(
        //     "/auth/verify",
        //     new AuthenticationHandler(this.data).verify,
        // );
    }

    public get = (): RouterInstance => {
        return this.router;
    };

    private register = (resource: string, handler: Handler): void => {
        const route: RouterInstance = new Handler(this.data).get();

        this.router.use(`/${resource}`, Authentication, route);
    };
}
