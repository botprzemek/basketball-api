import { Sql } from "postgres";
import Field from "@/services/data/database/statement/field";

export default class Model {
    private readonly name: string;
    private readonly fields: Field[];
    private readonly sql: Sql;

    constructor(name: string, sql: Sql) {
        this.name = name;
        this.fields = [];
        this.sql = sql;
    }

    public addFields = (...fields: Field[]): Model => {
        this.fields.push(...fields);
        return this;
    };

    public create = async (): Promise<void> => {
        await this.sql.unsafe(
            `CREATE TABLE IF NOT EXISTS basketball.${this.name} (${this.transformFields()})`,
        );
    };

    public insert = async (payload: any): Promise<void> => {
        await this
            .sql`INSERT INTO basketball.${this.sql(this.name)} ${this.sql(payload)}`;
    };

    public get = async (): Promise<any[]> => {
        return this.sql`SELECT * FROM basketball.${this.sql(this.name)}`;
    };

    private transformFields = (): string => {
        return this.fields
            .map((field: Field): string => field.build())
            .join(",\n  ");
    };
}
