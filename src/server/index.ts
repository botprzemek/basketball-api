import config from "@/config";
import logger from "@/utils/logger";
import {
    getAddress,
    getEnvironment,
    getHttp,
    getVersion,
} from "@/config/types/server";

import cluster from "node:cluster";
import { createServer, Server as HttpServer } from "node:http";
import { cpus } from "node:os";

export const listen = (server: HttpServer): void => {
    if (server.listening) {
        return;
    }

    process.on("uncaughtException", (error: Error): void => {
        logger.error(getAddress().host, [error.stack as string]);

        server.closeIdleConnections();
    });

    server.listen(getAddress().port, getAddress().host);
};

export const start = async (): Promise<void> => {
    await config;

    if (cluster.isWorker) {
        const server = createServer((await import("@/server/router")).default);

        Object.entries(getHttp()).forEach(([key, value]) => {
            (server as any)[key] = value;
        });

        return listen(server);
    }

    if (getEnvironment() === "development") {
        const server = createServer((await import("@/server/router")).default);

        logger.info(getAddress().host, [
            "LISTEN",
            `Started API server on http://${getAddress().host}:${getAddress().port}/v${getVersion()}`,
            "(DEVELOPMENT MODE [No clustering])",
        ]);

        return listen(server);
    }

    logger.info(getAddress().host, [
        "LISTEN",
        `Started API server on http://${getAddress().host}:${getAddress().port}/v${getVersion()}`,
        `(CLUSTER MODE [${cpus().length} CPUs])`,
    ]);

    cpus().forEach(() => cluster.fork());
};

export default start;
