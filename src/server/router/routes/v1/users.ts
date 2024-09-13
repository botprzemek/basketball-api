import { Router } from "express";
import { get, getById, post, put, _delete } from "@/server/handlers/v1/users";

const router: Router = Router()
    .get("/users", get)
    .get("/users/:id", getById)
    .post("/users", post)
    .put("/users", put)
    .delete("/users", _delete);

export default router;
