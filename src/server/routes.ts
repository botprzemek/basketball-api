import authentication from "@/server/middlewares/authentication";
import auth from "@/server/routes/auth";
import users from "@/server/routes/users";
import teams from "@/server/routes/teams";
import players from "@/server/routes/players";
import { getRouter } from "@/config/types/server";

import { Router } from "express";

export const routes: Router = Router(getRouter())
    .use("/auth", auth)
    .use("/users", authentication, users)
    .use("/teams", authentication, teams)
    .use("/players", authentication, players);

export default routes;
