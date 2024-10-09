import { Router } from "express";
import { _delete, get, getById, post, put } from "@/server/handlers/users";

const router: Router = Router()
    .get("/users", get)
    .post("/users", post)
    .get("/users/:id", getById)
    .put("/users/:id", put)
    .delete("/users/:id", _delete);

export default router;
