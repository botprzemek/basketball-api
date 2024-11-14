import logger from "@/server/middlewares/logger";
import headers from "@/server/middlewares/headers";
import routes from "@/server/routes";
import wildcard from "@/server/middlewares/wildcard";
import { getVersion } from "@/config/types/server";

import express, { json } from "express";

export const router = express()
    .use(json())
    .use(headers)
    .use(logger)
    .use(`/v${getVersion()}`, routes)
    .use(wildcard);

export default router;
