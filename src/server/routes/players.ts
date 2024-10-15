import { _delete, get, getById, post, put } from "@/server/handlers/players";

import { Router } from "express";

const router: Router = Router()
    .get("/players", get)
    .get("/players/:id", getById)
    .post("/players", post)
    .put("/players/:id", put)
    .delete("/players/:id", _delete);

export default router;
