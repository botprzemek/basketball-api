import { getAddress } from "@/config/types/server";
import { logError, logInfo } from "@/utils/logger";
import router from "@/server/router";

import { createServer, Server as HttpServer } from "node:http";

const close = (): void => {
    logInfo(getAddress().host, ["LISTEN", `Closing API server`]);
    api.close((err) => {
        logInfo(getAddress().host, ["LISTEN", `Stopped API server`]);

        process.exit(err ? 1 : 0);
    });
};

const api: HttpServer = createServer(router);

export const listen = (server: HttpServer = api): void => {
    if (server.listening) {
        return;
    }

    process.on("SIGINT", close);
    process.on("SIGTERM", close);
    process.on("uncaughtException", (error: Error): void =>
        logError(getAddress().host, [error.stack as string]),
    );

    server.listen(getAddress().port, getAddress().host, () =>
        logInfo(getAddress().host, [
            "LISTEN",
            `Started API server on port ${getAddress().port}`,
        ]),
    );
};
