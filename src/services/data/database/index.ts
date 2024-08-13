import Config from "@/config/database";
import Model from "@/services/data/database/statement/model";

import postgres, { Sql } from "postgres";
import Field from "@/services/data/database/statement/field";
import players from "@/services/data/database/mocked/players";

export default class Database {
    private readonly sql: Sql;

    constructor() {
        this.sql = postgres(new Config().getUrl(), new Config().getOptions());
    }

    public test = (): Sql => {
        return this.sql;
    };

    public get = async (name: string): Promise<any[]> => {
        return new Model(name, this.sql).get();
    };

    public initialize = async (): Promise<void> => {
        await this.sql`
            DROP SCHEMA IF EXISTS basketball CASCADE;
            CREATE SCHEMA IF NOT EXISTS basketball;
            CREATE TYPE basketball.position_enum AS ENUM ('PG', 'SG', 'SF', 'PF', 'C');
        `.simple();

        const userModel: Model = new Model("users", this.sql).addFields(
            new Field("id").setType("serial").setPrimary(),
            new Field("email").setType("varchar").setNotNull().setUnique(),
            new Field("password").setType("varchar").setNotNull(),
            new Field("last_login").setType("date"),
            new Field("created_at").setType("date").setDefault("now()"),
            new Field("updated_at").setType("date"),
        );
        await userModel.create();

        const playerModel: Model = new Model("players", this.sql).addFields(
            new Field("id").setType("serial").setPrimary(),
            new Field("team_id").setType("serial"),
            new Field("name").setType("varchar").setNotNull(),
            new Field("lastname").setType("varchar").setNotNull(),
            new Field("nationality").setType("varchar").setNotNull(),
            new Field("number").setType("int").setNotNull(),
            new Field("height").setType("float").setNotNull(),
            new Field("weight").setType("float"),
            new Field("wingspan").setType("float"),
            new Field("position")
                .setType("basketball.position_enum")
                .setNotNull(),
            new Field("birth_date").setType("date").setNotNull(),
            new Field("starter")
                .setType("boolean")
                .setNotNull()
                .setDefault("false"),
        );
        await playerModel.create();
        await playerModel.insert(players);
    };
}
