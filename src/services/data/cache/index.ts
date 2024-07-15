import Config from "@/config/cache";

import { Redis } from "ioredis";

export default class Database {
    private readonly instance: Redis;

    constructor() {
        this.instance = new Redis(Config.get());
    }

    public clear = (): void => {};

    public connect = (): void => {};

    public get = (): void => {};

    public initialize = (): void => {};
}
