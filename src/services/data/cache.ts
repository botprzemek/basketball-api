import { getExpireTime, getUrl } from "@/config/types/cache";

import { Redis } from "ioredis";

// @ts-ignore
BigInt.prototype.toJSON = function () {
    return this.toString();
};

const instance: Redis = new Redis(getUrl());

export const get = async <Resource>(key: string): Promise<Resource> => JSON.parse(`${await instance.get(key)}`);

export const set = async (key: string, data: any[]): Promise<"OK"> =>
    instance.set(key, JSON.stringify(data), "EX", getExpireTime());
