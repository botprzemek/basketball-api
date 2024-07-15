import headers from "@/middlewares/headers";
import Router from "@/server/router";
import Config from "@/config/server";

import { createServer, Server as HttpServer } from "node:http";

import express from "express";

export default class Server {
    private readonly server: HttpServer;
    private readonly config: Config;

    constructor() {
        this.config = new Config();
        const api: express.Express = express().use(
            `/v${this.config.getVersion()}`,
            headers,
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
