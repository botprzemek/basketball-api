import * as cache from "@/services/cache";
import * as database from "@/services/database";
import * as user from "@/models/user";
import { getAddress, getVersion } from "@/config/types/server";
import { logInfo, logError } from "@/utils/logger";
import logger from "@/server/middlewares/logger";
import headers from "@/server/middlewares/headers";
import wildcard from "@/server/middlewares/wildcard";

import { createServer, Server as HttpServer } from "node:http";

import express from "express";

const close = (): void => {
    console.log("\nClosing server...");
    api.close((err) => {
        console.log("Server closed...");

        process.exit(err ? 1 : 0);
    });
};

const testHandler = async (request: express.Request, response: express.Response) => {
    const key: string = "users";
    const cachedData: any[] = await cache.get(key);

    if (cachedData && cachedData.length) {
        const buffer: Buffer = Buffer.from(
            JSON.stringify({
                source: "CACHE",
                data: cachedData,
            }),
        );

        response.end(buffer);
        return;
    }

    const data: user.User[] = await user.getAll();

    const setData = await cache.set(key, data);

    if (setData !== "OK") {
        response.end();
        return;
    }

    response.status(200);

    if (!data) {
        response.end();
        return;
    }

    const buffer: Buffer = Buffer.from(
        JSON.stringify({
            source: "DATABASE",
            data: data,
        }),
    );

    response.end(buffer);
};

const router: express.Express = express()
    .use(express.json())
    .use(logger)
    .use(headers)
    .use(`/v${getVersion()}`, testHandler)
    .post("/", async (request: express.Request, response: express.Response) => {
        const { users } = request.body;

        await user.create(users as user.User[]);

        response.status(200);
        response.end();
    })
    .use(wildcard);

const api: HttpServer = createServer(router);

export const listen = (server: HttpServer = api, { host, port }: Connection = getAddress()): void => {
    if (server.listening) {
        return;
    }

    process.on("SIGINT", close);
    process.on("uncaughtException", (error: Error): void => {
        logError(getAddress().host, [error.stack as string]);
        close();
    });

    server.listen(port, host, () => logInfo(host, ["LISTEN", `Started API server on port ${port}`]));
};
