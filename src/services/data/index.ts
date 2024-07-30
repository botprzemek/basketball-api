import Cache from "@/services/data/cache";
import Database from "@/services/data/database";

export default class Data {
    private readonly cache: Cache;
    private readonly database: Database;

    constructor() {
        this.cache = new Cache();
        this.database = new Database();
    }

    public get = async (): Promise<[]> => {
        let data: [] = [];

        // this.cache.getModel(resource);
        // await this.database.getModel(resource);

        return data;
    };
}
