import Config from "@/config/database";
import Model from "@/services/data/database/statement/model";

import postgres, { Sql } from "postgres";
import Field from "@/services/data/database/statement/field";
import users from "@/services/data/database/mocked/users";
import players from "@/services/data/database/mocked/players";

export default class Database {
    private readonly sql: Sql;

    constructor() {
        const config: Config = new Config();
        this.sql = postgres(config.getUrl(), config.getOptions());
    }

    public test = (): Sql => {
        return this.sql;
    };

    public get = async (name: string): Promise<any[]> => {
        return this.sql`SELECT * FROM basketball.${this.sql(name)}`;
    };

    public initialize = async (): Promise<void> => {
        const userFields: Field[] = [
            new Field("id").setType("serial").setPrimary(),
            new Field("email").setType("varchar").setNotNull().setUnique(),
            new Field("password").setType("varchar").setNotNull(),
            new Field("last_login").setType("date"),
            new Field("created_at").setType("date").setDefault("now()"),
            new Field("updated_at").setType("date"),
        ];

        const userModel: Model = new Model(this.sql, "users").addFields(
            ...userFields,
        );

        const playerFields: Field[] = [
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
        ];

        const playerModel: Model = new Model(this.sql, "players").addFields(
            ...playerFields,
        );

        await userModel.drop(this.sql);
        await playerModel.drop(this.sql);

        await this.sql`
            DROP TYPE IF EXISTS basketball.position_enum;
            CREATE TYPE basketball.position_enum AS ENUM ('PG', 'SG', 'SF', 'PF', 'C');
        `.simple();

        await userModel.create(this.sql);
        await playerModel.create(this.sql);

        await userModel.insert(this.sql, users);
        await playerModel.insert(this.sql, players);
    };
}
