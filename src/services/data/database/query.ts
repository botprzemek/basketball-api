class Insert {
    private query: string;
    private name: string;
    private values: any[];

    constructor() {
        this.query = "";
        this.name = "";
        this.values = [];
    }

    insert(table: string): this {
        this.query = `INSERT INTO ${table}`;
        return this;
    }

    setName(name: string): this {
        this.name = name;
        return this;
    }

    add(...values: string[]): this {
        this.values = values;
        return this;
    }

    build(): string {
        const columns = this.name ? ` (${this.name})` : "";
        const values = this.values.length
            ? ` VALUES (${this.values.map((val) => `'${val}'`).join(", ")})`
            : "";
        return `${this.query}${columns}${values};`;
    }
}

export class Create {
    private readonly name: string;
    private fields: Field[];

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
            .map((field: Field) => field.build())
            .join(",\n  ");

        query.push(`(\n  ${fields}\n);`);

        return query.join(" ");
    };
}

export class Field {
    private readonly name: string;
    private type: string = "VARCHAR";
    private isPrimary: boolean = false;
    private isForeign: boolean = false;
    private isNotNull: boolean = false;
    private hasDefault: string = "";

    constructor(name: string, type: string = "VARCHAR") {
        this.name = name;
        this.type = type;
    }

    public setType = (type: string): this => {
        this.type = type;

        return this;
    };

    public setPrimary = (bool: boolean = true): this => {
        this.isPrimary = bool;

        return this;
    };

    public setForeign = (bool: boolean = true): this => {
        this.isForeign = bool;

        return this;
    };

    public setNotNull = (bool: boolean = true): this => {
        this.isNotNull = bool;

        return this;
    };

    public setDefault = (value: string): this => {
        this.hasDefault = value.toString();

        return this;
    };

    public build = (): string => {
        const query: string[] = [this.name, this.type];

        if (this.isPrimary) {
            query.push("PRIMARY KEY");
        }

        if (this.isForeign) {
            query.push("FOREIGN KEY");
        }

        if (this.isNotNull) {
            query.push("NOT NULL");
        }

        if (this.hasDefault !== "") {
            query.push(`DEFAULT ${this.hasDefault}`);
        }

        return query.join(" ");
    };
}
