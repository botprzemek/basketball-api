import logger from "@/server/middlewares/logger";
import headers from "@/server/middlewares/headers";
import routes from "@/server/routes";
import wildcard from "@/server/middlewares/wildcard";
import { getVersion } from "@/config/server";

import express, { Express, json } from "express";

export const router: Express = express()
    .use(json())
    .use(logger)
    .use(headers)
    .use(`/v${getVersion()}`, routes)
    .use(wildcard);

export default router;
