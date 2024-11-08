import auth from "@/server/routes/auth";
import user from "@/services/data/models/user";
import { getRouter } from "@/config/types/server";
import { _delete, get, getById, post, put } from "@/server/handlers";

import { Router } from "express";
import authorization from "@/server/middlewares/authorization";

export const generate = ({
    name,
    find,
    findById,
    create,
    update,
    remove,
}: Resource): Router =>
    Router()
        .get("/", authorization(user.name, "READ"), get(name, find))
        .get("/:id", getById(name, findById))
        .post("/", post(name, create))
        .put("/:id", put(name, update))
        .delete("/:id", _delete(name, remove));

export const routes: Router = Router(getRouter())
    .use("/auth", auth)
    .use("/users", generate(user));

export default routes;
