import user from "@/services/data/models/user";
import { getRouter } from "@/config/types/server";
import { _delete, get, getById, post, put } from "@/server/handlers";

import { Router } from "express";

const generate = ({
    name,
    find,
    findById,
    create,
    update,
    remove,
}: Resource): Router =>
    Router()
        .get("/", get(name, find))
        .get("/:id", getById(name, findById))
        .post("/", post(name, create))
        .put("/:id", put(name, update))
        .delete("/:id", _delete(name, remove));

export const routes: Router = Router(getRouter()).use("/users", generate(user));

export default routes;
