import Config from "@/config/server";
import Controller from "@/server/controllers";
import Data from "@/services/data";
import { InternalError, NoContentError } from "@/server/router/error";

import { gzipSync } from "node:zlib";

import { Request, Response } from "express";

export default class Handler {
    protected readonly controller: Controller;

    constructor(dataReference: Data) {
        this.controller = new Controller(dataReference);
    }

    public get = async (
        _request: Request,
        response: Response,
    ): Promise<void> => {
        const payload = await this.controller.get();

        if (!payload) {
            new InternalError(response, "Data source failure");
            return;
        }

        if (payload.length === 0) {
            new NoContentError(response);
            return;
        }

        response.status(200);

        this.send(response, payload);
    };

    public post = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        await this.controller.create(request.body);

        response.status(201);

        this.send(response);
    };

    public put = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        await this.controller.update(request.body);

        response.status(204);

        this.send(response);
    };

    public delete = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        await this.controller.remove(request.body);

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
            response.end(gzipSync(buffer));
        }

        response.end(buffer);
    };
}
