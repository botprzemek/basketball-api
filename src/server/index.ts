import ApiKey from "@/middlewares/apiKey";
import Config from "@/config/server";
import Headers from "@/middlewares/headers";
import ExceptionHandler from "@/handlers/exception";
import Router from "@/server/router";

import { createServer, Server as HttpServer } from "node:http";

import express from "express";

export default class Server {
    private readonly server: HttpServer;
    private readonly config: Config;

    constructor() {
        ExceptionHandler();

        this.config = new Config();
        const api: express.Express = express().use(
            `/v${this.config.getVersion()}`,
            ApiKey,
            Headers,
            new Router().getInstance(),
        );

        this.server = createServer(api);
    }

    public listen(): void {
        if (this.server.listening) {
            return;
        }

        this.server.listen(this.config.getPort(), this.config.getHost());
    }
}
