import { getExpireTime, getUrl } from "@/config/types/cache";
import { gunzipSync, gzipSync } from "node:zlib";

import { Redis } from "ioredis";

const instance = new Redis(getUrl());

const USE_COMPRESSION = true;

export const get = async (key: string): Promise<Entity[] | null> => {
    if (!USE_COMPRESSION) {
        return JSON.parse(`${await instance.get(key)}`);
    }

    const compressed = await instance.getBuffer(key);

    if (!compressed) {
        return null;
    }

    const decompressed = gunzipSync(compressed);

    return JSON.parse(decompressed.toString());
};

export const set = async (key: string, data: Entity[]): Promise<"OK"> => {
    if (!USE_COMPRESSION) {
        return instance.set(key, JSON.stringify(data), "EX", getExpireTime());
    }

    const compressed = gzipSync(JSON.stringify(data));

    return instance.set(key, compressed, "EX", getExpireTime());
};

export const clear = async (keys: string[]): Promise<number> => {
    return instance.del(keys);
};

export default {
    get,
    set,
    clear,
};
