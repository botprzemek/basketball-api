import { useCompression } from "@/config/types/server";
import {
    find,
    findById,
    create,
    update,
    remove,
} from "@/services/data/models/user";

import { gzipSync } from "node:zlib";

import { NextFunction, Request, Response } from "express";
import { isFailure } from "@/utils/error";

export const get = async (
    _request: Request,
    response: Response,
): Promise<void> => {
    const result: Data<User[]> = await find();

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

    const result: Data<User[]> = await findById(id);

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

export const post = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { data } = request.body;

    if (!data || data.length === 0) {
        response.status(400).end();
        return;
    }

    const result: Data<User[]> = await create(data);

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

export const put = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { id } = request.params;

    if (!id || !/^\d{16,20}$/.test(id)) {
        response.status(400).end();
        return;
    }

    const { data } = request.body;

    if (!data || data.length === 0) {
        response.status(201).end(JSON.stringify(data));
        return;
    }

    const result: Data<User[]> = await update(id, data);

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

export const _delete = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { id } = request.params;

    if (!id || !/^\d{16,20}$/.test(id)) {
        response.status(400).end();
        return;
    }

    const result: Data<User[]> = await remove(id);

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
