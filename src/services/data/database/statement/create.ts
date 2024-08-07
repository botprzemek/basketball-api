import Field from "@/services/data/database/statement/field";

export default class Create {
    private readonly name: string;
    private readonly fields: Field[];

    constructor(name: string) {
        this.name = name;
        this.fields = [];
    }

    public addFields = (...fields: Field[]): Create => {
        this.fields.push(...fields);

        return this;
    };

    public build = (): string => {
        const query: string[] = ["CREATE TABLE IF NOT EXISTS", this.name];

        const fields: string = this.fields
            .map((field: Field): string => field.build())
            .join(",\n  ");

        query.push(`(\n  ${fields}\n);`);

        return query.join(" ");
    };
}
