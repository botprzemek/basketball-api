import Authenticate from "@/server/middlewares/authenticate";
import Data from "@/services/data";
import Login from "@/server/handlers/auth/login";
import Register from "@/server/handlers/auth/register";
import Route from "@/server/router/route";

import { Router as RouterInstance, RouterOptions } from "express";

export default class Router {
    private readonly data: Data;
    private readonly router: RouterInstance;

    constructor(options: RouterOptions) {
        this.data = new Data();
        this.router = RouterInstance(options);

        this.router.post("/auth/register", Register);
        this.router.post("/auth/login", Login);

        ["players"].forEach(this.register);
    }

    public get = (): RouterInstance => {
        return this.router;
    };

    private register = (resource: string): void => {
        const route: RouterInstance = new Route(this.data).get();

        this.router.use(`/${resource}`, Authenticate, route);
    };
}
