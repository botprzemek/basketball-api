import { getUrl } from "@/config/types/cache";

import { parentPort, workerData } from "node:worker_threads";
import { gunzipSync } from "node:zlib";

import { Redis } from "ioredis";

export const instance = new Redis(getUrl());

(async (): Promise<void> => {
    if (!parentPort) {
        return;
    }

    const compressed = await instance.getBuffer(workerData.key);

    if (!compressed) {
        parentPort.postMessage(null);
        return;
    }

    const decompressed = gunzipSync(compressed);

    parentPort.postMessage(JSON.parse(decompressed.toString()));
})();
