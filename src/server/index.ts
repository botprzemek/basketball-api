import Config from "@/config/server";
import Router from "@/server/router";

import { createServer, Server as HttpServer } from "node:http";

import express from "express";
import headers from "@/server/headers";

export default class Server {
    private readonly server: HttpServer;

    constructor() {
        const api: express.Express = express().use(
            `/v${Config.getVersion()}`,
            headers,
            new Router().get(),
        );

        this.server = createServer(api);
    }

    public listen(): void {
        if (this.server.listening) {
            return;
        }

        this.server.listen(Config.getPort(), Config.getHost());
    }
}
