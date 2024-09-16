import { Router } from "express";
import users from "@/server/router/routes/users";

const router: Router = Router().use(users);

export default router;
