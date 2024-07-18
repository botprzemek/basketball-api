import ApiKey from "@/server/middlewares/apiKey";
import Config from "@/config/server";
import Error from "@/server/middlewares/error";
import Headers from "@/server/middlewares/headers";
import Router from "@/server/router";

import { createServer, Server as HttpServer } from "node:http";

import express from "express";

export default class Server {
    private readonly server: HttpServer;
    private readonly config: Config;

    constructor() {
        this.config = new Config();

        const api: express.Express = express()
            .use(Headers)
            .use(ApiKey)
            .use(`/v${this.config.getVersion()}`, new Router().getInstance())
            .use(Error);

        this.server = createServer(api);
    }

    public listen(): void {
        if (this.server.listening) {
            return;
        }

        this.server.listen(this.config.getPort(), this.config.getHost());
    }
}
