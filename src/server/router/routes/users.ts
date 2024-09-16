import { Router } from "express";
import { _delete, get, getById, post, put } from "@/server/handlers/users";

const router: Router = Router()
    .get("/users", get)
    .get("/users/:id", getById)
    .post("/users", post)
    .put("/users", put)
    .delete("/users", _delete);

export default router;
