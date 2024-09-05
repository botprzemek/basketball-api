import Config from "@/config/server";
import Data from "@/services/data";
import { InternalError, NoContentError } from "@/routes/error";

import { gzipSync } from "node:zlib";

import { Request, Response } from "express";

export default class ResourceHandler {
    protected readonly data: Data;

    constructor(data: Data) {
        this.data = data;
    }

    public get = async (
        _request: Request,
        response: Response
    ): Promise<void> => {
        const payload = await this.data.get("players");

        if (!payload) {
            new InternalError(response, "Data source failure");
            return;
        }

        if (!payload.length) {
            new NoContentError(response);
            return;
        }

        response.status(200);

        this.send(response, payload);
    };

    public post = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        // await this.controller.create(request.body);

        response.status(201);

        this.send(response);
    };

    public put = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        // await this.controller.update(request.body);

        response.status(204);

        this.send(response);
    };

    public delete = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        // await this.controller.remove(request.body);

        response.status(204);

        this.send(response);
    };

    private send = (response: Response, data?: any[]): void => {
        if (!data) {
            response.end();
            return;
        }

        const value: string = JSON.stringify(data);
        const buffer: Buffer = Buffer.from(value);

        if (new Config().getCompression()) {
            response.set("Content-Encoding", "gzip").end(gzipSync(buffer));
            return;
        }

        response.end(buffer);
    };
}
