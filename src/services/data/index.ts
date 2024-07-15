import Cache from "@/services/data/cache";
import Database from "@/services/data/database";

export default class Data {
    private readonly cache: Cache;
    private readonly database: Database;

    constructor() {
        this.cache = new Cache();
        this.database = new Database();
    }
}
