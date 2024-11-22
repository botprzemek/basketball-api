import cache from "@/stores/cache";
import { useCompression } from "@/config/types/server";

import { gzipSync } from "node:zlib";

import { Response } from "express";

export const wrap = (data: Data): Payload => {
    if (Array.isArray(data)) {
        return {
            data,
        };
    }

    return {
        data: [],
        error: data,
    };
};

export const get = async (key: string, query: Query): Result => {
    try {
        const cached = await cache.get(key);

        if (cached) {
            return wrap(cached);
        }

        const stored = await query();

        void cache.set(key, stored);

        return wrap(stored);
    } catch (error) {
        // TODO ERROR HANDLING

        if (error instanceof Error) {
            return wrap({
                status: 500,
                message: error.message,
            });
        }

        return wrap({
            status: 500,
            message: "Internal Server Error",
        });
    }
};

const convert = (data: Payload): Buffer => {
    const value = JSON.stringify(data);
    const buffer = Buffer.from(value);

    if (!useCompression()) {
        return buffer;
    }

    return gzipSync(buffer);
};

export const send = (
    payload: Payload,
    response: Response,
    status?: number,
): void => {
    response.status(status || 200);

    if (payload.error) {
        response.status(payload.error?.status || 500);
    }

    if (useCompression()) {
        response.set("Content-Encoding", "gzip");
    }

    response.end(convert(payload));
};

export const NOT_IMPLEMENTED = wrap({
    status: 501,
    message: "Function not implemented",
});

export default {
    wrap,
    get,
    send,
    NOT_IMPLEMENTED,
};
