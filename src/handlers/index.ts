import Config from "@/config/server";
import Data from "@/services/data";
import Controller from "@/controllers";
import Resource from "@/models/resource";

import { gzipSync } from "node:zlib";
import { URL } from "node:url";

import { Request, Response } from "express";

export default class Handler {
    private readonly controller: Controller;

    constructor(resource: Resource, data: Data) {
        this.controller = new Controller(resource, data);
    }

    public get = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        const payload = await this.controller.get();

        this.send(request, response.status(200), payload);
    };

    public post = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        await this.controller.create(request.body);

        this.send(request, response.status(201), []);
    };

    public put = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        await this.controller.update(request.body);

        this.send(request, response.status(204), []);
    };

    public delete = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        await this.controller.delete(request.body);

        this.send(request, response.status(204), []);
    };

    private send = (
        request: Request,
        response: Response,
        data?: any[],
    ): void => {
        if (!data) {
            response.end();
            return;
        }

        const url = new URL(
            `${request.protocol}://${request.get("host")}${request.originalUrl}`,
        );

        if (data.length === 0) {
            data = [
                {
                    links: {
                        self: {
                            href: url,
                        },
                        idk: {
                            href: `${url}/idk`,
                        },
                    },
                },
            ];
        }

        data.map((value: Object): Object => {
            return {
                ...value,
                links: {
                    self: {
                        href: request.url,
                    },
                    idk: {
                        href: `${request.url}/idk`,
                    },
                },
            };
        });

        const value: string = JSON.stringify(data);

        let buffer: Buffer = Buffer.from(value);

        if (new Config().getCompression()) {
            buffer = gzipSync(buffer);
        }

        response.set("Content-Length", buffer.length.toString()).end(buffer);
    };
}
