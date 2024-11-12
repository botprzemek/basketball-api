import logger from "@/server/middlewares/logger";
import headers from "@/server/middlewares/headers";
import routes from "@/server/routes";
import wildcard from "@/server/middlewares/wildcard";
import { getEnvironment, getVersion } from "@/config/types/server";

import express, { json } from "express";

const router = express().use(json()).use(headers);

if (getEnvironment() === "development") {
    router.use(logger);
}

router.use(`/v${getVersion()}`, routes).use(wildcard);

export default router;
