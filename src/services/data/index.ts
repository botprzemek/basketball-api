import Cache from "@/services/data/cache";
import Database from "@/services/data/database";

export default class Data {
    private readonly cache: Cache;
    private readonly database: Database;

    constructor() {
        this.cache = new Cache();
        this.database = new Database();
    }

    public get = async <Resource>(key: string): Promise<Resource[]> => {
        const cachedData: Resource[] = await this.cache.get<Resource>(key);

        if (cachedData && cachedData.length) {
            return cachedData;
        }

        const data: Resource[] = await this.database.get(key);

        this.cache.set(key, data);

        return data;
    };
}
