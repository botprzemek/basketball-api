import {
    login,
    register,
    refresh,
    logout,
} from "@/server/handlers/authentication";

import { Router } from "express";

const router: Router = Router()
    .post("/login", login)
    .post("/register", register)
    .get("/refresh", refresh)
    .get("/logout", logout);

export default router;
