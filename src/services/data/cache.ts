import { getUrl, getExpireTime } from "@/config/cache";

import { Redis } from "ioredis";

// @ts-ignore
BigInt.prototype.toJSON = function () {
    return this.toString();
};

const instance: Redis = new Redis(getUrl());

export const get = async <Model>(key: string): Promise<Model> =>
    JSON.parse(`${await instance.get(key)}`);

export const set = async (key: string, data: Model | Model[]): Promise<"OK"> =>
    instance.set(key, JSON.stringify(data), "EX", getExpireTime());

export const clear = async (keys: string[]): Promise<number> =>
    instance.del(keys);

export default {
    get,
    set,
    clear,
};
