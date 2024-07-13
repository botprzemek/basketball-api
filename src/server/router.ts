import Model from "@/server/model";
import Route from "@/server/route";

import { Router, RouterOptions } from "express";

const register = (model: Model): void => new Route().register(router, model);

const options: RouterOptions = {
    mergeParams: true,
}

const router: Router = Router(
    options
);

Object.keys(Model)
    .map((model: string) => Model[model as keyof typeof Model])
    .forEach(register);

export default router;
