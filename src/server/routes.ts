import user from "@/services/data/models/user";
import auth from "@/server/routes/auth";
import { getRouter } from "@/config/types/server";
import { _delete, get, getById, post, put } from "@/server/handlers";

import { Router } from "express";

const route = (resource: any): Router =>
    Router()
        .get("/", get(resource.find))
        .get("/:id", getById(resource.findById))
        .post("/", post(resource.create))
        .put("/:id", put(resource.update))
        .delete("/:id", _delete(resource._delete));

export const routes: Router = Router(getRouter())
    .use("/auth", auth)
    .use("/users", route(user));

export default routes;
