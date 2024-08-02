import Cache from "@/services/data/cache";
import Database from "@/services/data/database";

import mocked from "@/services/data/mocked";

export default class Data {
    private readonly cache: Cache;
    private readonly database: Database;

    constructor() {
        this.cache = new Cache();
        this.database = new Database();
    }

    public get = async (): Promise<any[]> => {
        const KEY: string = "players";
        let data = [];

        const cachedData: string | null = await this.cache.get().get(KEY);

        if (cachedData) {
            return JSON.parse(cachedData);
        }

        data = await mocked();

        this.cache.get().set(KEY, JSON.stringify(data), "EX", 10);

        return data;
    };
}
