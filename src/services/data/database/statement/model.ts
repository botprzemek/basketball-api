import { Sql } from "postgres";
import Field from "@/services/data/database/statement/field";

export default class Model {
    private readonly name: string;
    private readonly fields: Field[];

    constructor(name: string) {
        this.name = name;
        this.fields = [];
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

    public insert = async (sql: Sql): Promise<Model> => {
        await sql.unsafe(``);

        return this;
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
