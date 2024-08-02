import ApiKey from "@/server/middlewares/apiKey";
import Config from "@/config/server";
import Headers from "@/server/middlewares/headers";
import Logger from "@/server/middlewares/logger";
import Router from "@/server/router";

import { createServer, Server as HttpServer } from "node:http";

import express, { Request, Response } from "express";
import { NotFoundError } from "@/server/router/error";

export default class Server {
    private readonly server: HttpServer;
    private readonly config: Config;

    constructor() {
        this.config = new Config();
        const options = {
            mergeParams: true,
        };

        const api: express.Express = express()
            .use(Logger)
            .use(Headers)
            .use(ApiKey)
            .use(`/v${this.config.getVersion()}`, new Router(options).get())
            .use(this.wildcard);

        this.server = createServer(api);
    }

    public listen(): void {
        if (this.server.listening) {
            return;
        }

        this.server.listen(this.config.getPort(), this.config.getHost());
    }

    private wildcard(request: Request, response: Response): void {
        new NotFoundError(response, request.originalUrl);
    }
}
