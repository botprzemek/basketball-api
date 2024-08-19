import Config from "@/config/server";
import Headers from "@/server/middlewares/headers";
import Logger from "@/server/middlewares/logger";
import Router from "@/server/router";
import { NotFoundError } from "@/server/router/error";

import { createServer, Server as HttpServer } from "node:http";

import express, { json, Request, Response, RouterOptions } from "express";
import CookieParser from "cookie-parser";

export default class Server {
    private readonly server: HttpServer;
    private readonly config: Config;

    constructor() {
        this.config = new Config();
        const options: RouterOptions = {
            mergeParams: true,
        };

        const api: express.Express = express()
            .use(CookieParser())
            .use(json())
            .use(Logger)
            .use(Headers)
            .use(`/v${this.config.getVersion()}`, new Router(options).get())
            .use(this.wildcard);

        this.server = createServer(api);

        process.on("SIGINT", this.close);
    }

    public listen = (): void => {
        if (this.server.listening) {
            return;
        }

        this.server.listen(this.config.getPort(), this.config.getHost());
    };

    public close = (): void => {
        console.log("\nClosing server...");
        this.server.close((err) => {
            console.log("Server closed...");

            process.exit(err ? 1 : 0);
        });
    };

    private wildcard = (request: Request, response: Response): void => {
        new NotFoundError(response, request.originalUrl);
    };
}
