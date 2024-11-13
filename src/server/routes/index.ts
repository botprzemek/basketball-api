import { getRouterOptions } from "@/config/types/server";
import users from "@/server/routes/users";

import { Router } from "express";

export const routes: Router = Router(getRouterOptions()).use("/users", users);

export default routes;
