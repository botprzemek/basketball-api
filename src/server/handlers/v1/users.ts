import { getCompression } from "@/config/types/server";
import * as controller from "@/server/controllers/v1/users";

import { gzipSync } from "node:zlib";

import express from "express";

export const get = async (
    _request: express.Request,
    response: express.Response,
): Promise<void> => {
    const result = await controller.get();

    const value: string = JSON.stringify(result);
    const buffer: Buffer = Buffer.from(value);

    if (getCompression()) {
        response.set("Content-Encoding", "gzip").end(gzipSync(buffer));
        return;
    }

    response.status(200).end(buffer);
};

export const getById = async (
    request: express.Request,
    response: express.Response,
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
    request: express.Request,
    response: express.Response,
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
    request: express.Request,
    response: express.Response,
): Promise<void> => {
    const { data } = request.body;

    if (!data || data.length === 0) {
        response.status(201).end(JSON.stringify(data));
        return;
    }

    await controller.put(data);

    response.status(204).end();
};

export const _delete = async (
    request: express.Request,
    response: express.Response,
): Promise<void> => {
    const { id } = request.query;

    if (!id || !/^\d{16,20}$/.test(id.toString())) {
        response.status(400).end();
        return;
    }

    await controller._delete(BigInt(id.toString()));

    response.status(204).end();
};
