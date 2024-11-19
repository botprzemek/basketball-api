import { getExpireTime, getUrl } from "@/config/types/cache";

import { Redis } from "ioredis";

BigInt.prototype.toJSON = function (): string {
    return this.toString();
};

const instance = new Redis(getUrl());

// THIS IS THE BOTTLENECK (CONNECTION AND instance.get(key) method).

export const get = async (key: string): Promise<Entity[]> =>
    JSON.parse(`${await instance.get(key)}`);

export const set = async (key: string, data: Entity[]): Promise<"OK"> =>
    instance.set(key, JSON.stringify(data), "EX", getExpireTime());

export const clear = async (keys: string[]): Promise<number> =>
    instance.del(keys);

export default {
    get,
    set,
    clear,
};
