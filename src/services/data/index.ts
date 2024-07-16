import Cache from "@/services/data/cache";
import Database from "@/services/data/database";
import Resource from "@/models/resource";

export default class Data {
    private readonly cache: Cache;
    private readonly database: Database;

    constructor() {
        this.cache = new Cache();
        this.database = new Database();
    }

    public get = async <T>(resource: Resource): Promise<T[]> => {
        let data: T[] = [];

        // this.cache.getModel(resource);
        // await this.database.getModel(resource);

        return data;
    };
}
