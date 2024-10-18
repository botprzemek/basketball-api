import logger from "@/server/middlewares/logger";
import headers from "@/server/middlewares/headers";
import { getVersion } from "@/config/types/server";
import wildcard from "@/server/middlewares/wildcard";
import users from "@/server/routes/users";
import players from "@/server/routes/players";
import teams from "@/server/routes/teams";

import express, { Express, Router } from "express";

const routes: Router = Router().use(users).use(teams).use(players);

const router: Express = express()
    .use(express.json())
    .use(logger)
    .use(headers)
    .use(`/v${getVersion()}`, routes)
    .use(wildcard);

export default router;
