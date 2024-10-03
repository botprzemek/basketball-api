import { useCompression } from "@/config/types/server";
import * as controller from "@/server/controllers/users";

import { gzipSync } from "node:zlib";

import { Request, Response } from "express";
import { isFailure } from "@/utils/error";

export const get = async (
    _request: Request,
    response: Response,
): Promise<void> => {
    const result: Data<User[]> = await controller.get();

    response.status(isFailure(result) ? result.error.status : 200);

    const value: string = JSON.stringify(result);
    const buffer: Buffer = Buffer.from(value);

    if (useCompression()) {
        response.set("Content-Encoding", "gzip");
        response.end(gzipSync(buffer));

        return;
    }

    response.end(buffer);
};

export const getById = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { id } = request.params;

    if (!id || !/^\d{16,20}$/.test(id)) {
        response.status(400).end();
        return;
    }

    const result = await controller.getById(BigInt(id));

    response.status(200).end(JSON.stringify(result));
};

export const post = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { data } = request.body;

    if (!data || data.length === 0) {
        response.status(400).end();
        return;
    }

    await controller.post(data);

    response.status(201).end();
};

export const put = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { id } = request.params;

    if (!id || !/^\d{16,20}$/.test(id.toString())) {
        response.status(400).end();
        return;
    }
    const { data } = request.body;

    if (!data || data.length === 0) {
        response.status(201).end(JSON.stringify(data));
        return;
    }

    await controller.put(BigInt(id), data);

    response.status(204).end();
};

export const _delete = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { id } = request.params;

    if (!id || !/^\d{16,20}$/.test(id.toString())) {
        response.status(400).end();
        return;
    }

    await controller._delete(BigInt(id));

    response.status(204).end();
};
