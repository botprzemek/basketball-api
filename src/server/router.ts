import express from "express";
import logger from "@/server/middlewares/logger";
import headers from "@/server/middlewares/headers";
import { getVersion } from "@/config/types/server";
import wildcard from "@/server/middlewares/wildcard";
import routes from "@/server/router/routes";

const router: express.Express = express()
    .use(express.json())
    .use(logger)
    .use(headers)
    .use(`/v${getVersion()}`, routes)
    .use(wildcard);

export default router;
