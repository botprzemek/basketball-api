import { getExpireTime, getUrl } from "@/config/types/cache";

import { Redis } from "ioredis";

const instance = new Redis(getUrl());

export const get = async (key: string): Promise<[] | null> => {
    return JSON.parse(`${await instance.get(key)}`);
};

export const set = async (key: string, data: []): Promise<"OK"> => {
    return instance.set(key, JSON.stringify(data), "EX", getExpireTime());
}

export const clear = async (keys: string[]): Promise<number> => {
    return instance.del(keys);
};

export default {
    get,
    set,
    clear,
};
