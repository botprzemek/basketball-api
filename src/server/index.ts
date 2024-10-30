import logger from "@/utils/logger";
import router from "@/server/router";
import { getAddress, getHttp, getVersion } from "@/config/server";

import cluster from "node:cluster";
import { createServer, Server as HttpServer } from "node:http";
import os from "node:os";

const close = (server: HttpServer): void => {
    logger.info(getAddress().host, ["LISTEN", "Closing API server"]);

    server.close((err: Error | undefined): void => {
        logger.info(getAddress().host, ["LISTEN", "Stopped API server"]);

        process.exit(err ? 1 : 0);
    });
};

export const listen = (server: HttpServer): void => {
    if (server.listening) {
        return;
    }

    process.on("SIGINT", () => close(server));
    process.on("SIGTERM", () => close(server));
    process.on("uncaughtException", (error: Error): void => {
        logger.error(getAddress().host, [error.stack as string]);
        // TODO
        // Exit request
    });

    server.listen(getAddress().port, getAddress().host, () =>
        logger.info(getAddress().host, [
            "LISTEN",
            `Started API server on http://${getAddress().host}:${getAddress().port}/v${getVersion()}`,
        ]),
    );
};

export default (): void => {
    if (!cluster.isPrimary) {
        const server = createServer(router);

        Object.entries(getHttp()).forEach(([key, value]) => {
            (server as any)[key] = value;
        });

        return listen(server);
    }

    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }

    cluster.on("exit", (_) => cluster.fork());
};
