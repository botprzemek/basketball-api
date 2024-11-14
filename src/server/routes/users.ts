import { get, getById, post, put, _delete } from "@/server/handlers/user";

import { Router } from "express";

export default Router()
    .get("/", get)
    .get("/:id", getById)
    .post("/", post)
    .put("/:id", put)
    .delete("/:id", _delete);
