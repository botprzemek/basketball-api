import Data from "@/services/data";
import Config from "@/config/server";
import Controller from "@/controllers";
import Resource from "@/models/resource";

import { Request, Response } from "express";
import { gzipSync } from "zlib";

export default class Handler {
    private readonly controller: Controller;

    constructor(resource: Resource, data: Data) {
        this.controller = new Controller(resource, data);
    }

    public get = async <T>(
        request: Request,
        response: Response,
    ): Promise<void> => {
        const payload: Promise<T[]> = await this.controller.create<T>(
            request.body as T[],
        );

        this.send(response.status(200), payload);
    };

    public post = async <T>(
        request: Request,
        response: Response,
    ): Promise<void> => {
        const payload: Promise<void> = await this.controller.create<T>(
            request.body as T[],
        );

        this.send(response.status(201));
    };

    public put = async <T>(
        request: Request,
        response: Response,
    ): Promise<void> => {
        const payload: Promise<void> = await this.controller.update<T>(
            request.body as T[],
        );

        this.send(response.status(204));
    };

    public delete = async <T>(
        request: Request,
        response: Response,
    ): Promise<void> => {
        const payload: Promise<void> = await this.controller.delete<T>(
            request.body as T[],
        );

        this.send(response.status(204));
    };

    private send = (response: Response, data?: any): void => {
        if (!data) {
            response.end();
            return;
        }

        data = JSON.stringify(data);

        let buffer: Buffer = Buffer.from(data);

        if (new Config().getCompression()) {
            buffer = gzipSync(buffer);
        }

        response.set("Content-Length", buffer.length.toString()).end(buffer);
    };
}
