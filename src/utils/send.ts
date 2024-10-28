import { Response } from "express";
import { isFailure } from "@/utils/error";
import { useCompression } from "@/config/types/server";
import { gzipSync } from "node:zlib";

export const send = (data: Data, response: Response, status?: number): void => {
    response.status(status || 200);

    if (isFailure(data)) {
        response.status(data.error.status);
    }

    const value: string = JSON.stringify(data);
    const buffer: Buffer = Buffer.from(value);

    if (!useCompression()) {
        response.end(buffer);
        return;
    }

    response.set("Content-Encoding", "gzip");
    response.end(gzipSync(buffer));
};

export default send;