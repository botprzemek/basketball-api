import Cache from "@/services/data/cache";
import Database from "@/services/data/database";

export default class Data {
    private readonly cache: Cache;
    private readonly database: Database;

    constructor() {
        this.cache = new Cache();
        this.database = new Database();

        void this.database.initialize();
    }

    public get = async <Resource>(key: string): Promise<Resource[]> => {
        const cachedData: Resource[] = await this.cache.get<Resource>(key);

        if (cachedData && cachedData.length) {
            return cachedData;
        }

        return this.cache.set(key, await this.database.get(key));
    };

    public getDatabase = (): Database => {
        return this.database;
    };
}
