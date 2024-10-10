import { _delete, get, getById, post, put } from "@/server/handlers/users";
import key from "@/server/middlewares/key";

import { Router } from "express";

const router: Router = Router()
    .get("/users", get)
    .get("/users/:id", getById)
    .post("/users", key, post)
    .put("/users/:id", key, put)
    .delete("/users/:id", key, _delete);

export default router;
