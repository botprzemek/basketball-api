import Config from "@/config/database";

import pg from "pg";
import player from "@/services/data/database/models/player";
import { Player } from "@/models/resources/player";
import mocked from "@/services/data/mocked";

export default class Database {
    private readonly instance: pg.Pool;

    constructor() {
        this.instance = new pg.Pool(new Config().getUrl());

        void this.initialize();
    }

    public get = (): Promise<pg.PoolClient> => {
        return this.instance.connect();
    };

    private initialize = async (): Promise<void> => {
        const statements: string[] = [player];

        await this.instance.query("DROP TABLE IF EXISTS basketball.players");

        await this.instance.query(
            "DROP TYPE IF EXISTS basketball.position_enum",
        );

        await this.instance.query(
            "CREATE TYPE basketball.position_enum AS ENUM ('PG', 'SG', 'SF', 'PF', 'C')",
        );

        for (const statement of statements) {
            await this.instance.query(statement);
        }

        for (const data of mocked.map((player: Player) =>
            Object.values(player),
        )) {
            await this.instance.query(
                `INSERT INTO basketball.players (team_id, name, lastname, nationality, number, height, weight, wingspan, position, birth_date, starter) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`,
                data,
            );
        }
    };
}
