import Config from "@/config/database";
import mocked from "@/services/data/database/mocked";
import player from "@/services/data/database/models/player";

import postgres, { Sql } from "postgres";

export default class Database {
    private readonly instance: Sql;

    constructor() {
        const config: Config = new Config();
        this.instance = postgres(config.getUrl(), config.getOptions());

        void this.initialize();
    }

    public get = async (name: string): Promise<any[]> => {
        return this.instance`SELECT * FROM basketball.${this.instance(name)}`;
    };

    private initialize = async (): Promise<void> => {
        await this.instance`
            DROP TABLE IF EXISTS basketball.players;
            DROP TYPE IF EXISTS basketball.position_enum;
            CREATE TYPE basketball.position_enum AS ENUM ('PG', 'SG', 'SF', 'PF', 'C');
        `.simple();

        await this.instance.unsafe(player);

        await this.instance.begin(async (sql: Sql): Promise<void> => {
            await sql`INSERT INTO basketball.players ${this.instance(mocked)};`;
        });
    };
}
