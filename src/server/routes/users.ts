import { _delete, get, getById, post, put } from "@/server/handlers/users";

import { Router } from "express";

const router: Router = Router()
    .get("/users", get)
    .get("/users/:id", getById)
    .post("/users", post)
    .put("/users/:id", put)
    .delete("/users/:id", _delete);

export default router;
