import { _delete, get, getById, post, put } from "@/server/handlers/user";

import { Router } from "express";

export default Router()
    .get("/", get)
    .post("/", post)
    .get("/:id", getById)
    .put("/:id", put)
    .delete("/:id", _delete);
