import { _delete, get, getById, post, put } from "@/server/handlers/team";

import { Router } from "express";

const router: Router = Router()
    .get("/teams", get)
    .get("/teams:id", getById)
    .post("/teams", post)
    .put("teams/:id", put)
    .delete("/teams", _delete);

export default router;
