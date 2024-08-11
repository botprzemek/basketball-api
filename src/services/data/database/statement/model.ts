import { Sql } from "postgres";
import Field from "@/services/data/database/statement/field";

export default class Model {
    private readonly name: string;
    private readonly fields: Field[];

    constructor(sql: Sql, name: string) {
        this.name = name;
        this.fields = [];

        void sql`CREATE IF NOT EXISTS NAMESPACE basketball`;
    }

    public addFields = (...fields: Field[]): Model => {
        this.fields.push(...fields);

        return this;
    };

    public create = async (sql: Sql): Promise<Model> => {
        await sql.unsafe(
            `CREATE TABLE IF NOT EXISTS basketball.${this.name} (${this.transformFields()})`,
        );

        return this;
    };

    public insert = async (sql: Sql, payload: any): Promise<any> => {
        return sql.begin(async (sql: Sql): Promise<void> => {
            sql`INSERT INTO basketball.${this.name} ${sql(payload)} ON CONFLICT DO NOTHING`;
        });
    };

    public drop = async (sql: Sql): Promise<Model> => {
        await sql`DROP TABLE IF EXISTS basketball.${sql(this.name)}`;

        return this;
    };

    private transformFields = (): string => {
        return this.fields
            .map((field: Field): string => field.build())
            .join(",\n  ");
    };
}
