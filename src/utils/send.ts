import { isFailure } from "@/utils/error";
import { useCompression } from "@/config/types/server";

import { gzipSync } from "node:zlib";

import { Response } from "express";

export default (data: Data<Model[]>, response: Response): void => {
    response.status(isFailure(data) ? data.error.status : 200);

    const value: string = JSON.stringify(data);
    const buffer: Buffer = Buffer.from(value);

    if (useCompression()) {
        response.set("Content-Encoding", "gzip");
        response.end(gzipSync(buffer));

        return;
    }

    response.end(buffer);
};
