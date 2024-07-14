import Controller from "@/server/controller";

import { Request, Response } from "express";
import { gzipSync } from "zlib";

export default class Handler {
    private readonly controller: Controller;
    private readonly options: any;

    constructor(options: any) {
        this.controller = new Controller(options.resource);
        this.options = options;
    }

    public get = async <T>(
        request: Request,
        response: Response,
    ): Promise<void> => {
        const payload: T[] = await this.controller.get<T>();

        this.send(response.status(200), payload);
    };

    public post = async <T>(
        request: Request,
        response: Response,
    ): Promise<void> => {
        const payload = this.controller.create<T>(request.body);

        this.send(response.status(201));
    };

    public put = async <T>(
        request: Request,
        response: Response,
    ): Promise<void> => {
        const payload = this.controller.update<T>(request.body);

        this.send(response.status(204));
    };

    public delete = async <T>(
        request: Request,
        response: Response,
    ): Promise<void> => {
        const payload = this.controller.delete<T>(request.body);

        this.send(response.status(204));
    };

    private send = (response: Response, data?: any): void => {
        if (!data) {
            response.end();
            return;
        }

        data = JSON.stringify(data);

        let buffer: Buffer = Buffer.from(data);

        if (this.options.useCompression) {
            buffer = gzipSync(buffer);

            response.set("Content-Encoding", "gzip");
        }

        response.set("Content-Length", buffer.length.toString()).end(buffer);
    };
}
