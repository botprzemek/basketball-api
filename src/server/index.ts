import logger from "@/utils/logger";
import router from "@/server/router";
import { getAddress } from "@/config/types/server";

import { createServer, Server as HttpServer } from "node:http";

const api: HttpServer = createServer(router);

export const listen = (server: HttpServer = api): void => {
    if (server.listening) {
        return;
    }

    process.on("SIGINT", close);
    process.on("SIGTERM", close);
    process.on("uncaughtException", (error: Error): void => {
        logger.error(getAddress().host, [error.stack as string]);
        // TODO Exit request
    });

    server.listen(getAddress().port, getAddress().host, () =>
        logger.info(getAddress().host, [
            "LISTEN",
            `Started API server on port ${getAddress().port}`,
        ]),
    );
};

export const close = (): void => {
    logger.info(getAddress().host, ["LISTEN", `Closing API server`]);

    api.close((err) => {
        logger.info(getAddress().host, ["LISTEN", `Stopped API server`]);

        process.exit(err ? 1 : 0);
    });
};

export default {
    listen,
    close,
};
