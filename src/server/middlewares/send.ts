import { Response } from "express";
import { gzipSync } from "zlib";

const useCompression: boolean = true;

export default (response: Response, data?: any): void => {
    if (!data) {
        response.status(500).end();
        return;
    }

    data = JSON.stringify(data);

    let buffer: Buffer = Buffer.from(data);

    if (useCompression) {
        buffer = gzipSync(buffer);

        response.set("Content-Encoding", "gzip");
    }

    response
        .set("Content-Length", buffer.length.toString())
        .end(buffer);
}