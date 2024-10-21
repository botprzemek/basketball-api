import { _delete, get, getById, post, put } from "@/server/handlers/players";

import { Router } from "express";

const router: Router = Router()
    .get("/", get)
    .get("/:id", getById)
    .post("/", post)
    .put("/:id", put)
    .delete("/:id", _delete);

export default router;
