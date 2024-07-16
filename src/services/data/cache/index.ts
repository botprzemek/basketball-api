import Config from "@/config/cache";

import { Redis } from "ioredis";

export default class Database {
    private readonly instance: Redis;

    constructor() {
        this.instance = new Redis(new Config().get());
    }

    public clear = (): void => {};

    public connect = (): void => {};

    public get = (): Redis => {
        return this.instance;
    };

    public initialize = (): void => {};
}
