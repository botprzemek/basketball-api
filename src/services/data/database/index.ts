import Config from "@/config/database";

import pg from "pg";

export default class Database {
    private readonly instance: pg.Pool;

    constructor() {
        this.instance = new pg.Pool(Config.getUrl());
    }

    public clear = (): void => {};

    public connect = (): void => {};

    public get = (): void => {};

    public initialize = (): void => {};
}
