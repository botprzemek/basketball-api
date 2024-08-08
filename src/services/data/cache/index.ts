import Config from "@/config/cache";

import { Redis } from "ioredis";

export default class Cache {
    private readonly instance: Redis;

    constructor() {
        this.instance = new Redis(new Config().get());
    }

    public get = async <Resource>(key: string): Promise<Resource[]> => {
        return JSON.parse(`${await this.instance.get(key)}`);
    };

    public set = (key: string, data: any[]) => {
        this.instance.set(
            key,
            JSON.stringify(data),
            "EX",
            new Config().getExpireTime(),
        );
    };
}
