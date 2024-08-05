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

    // Method to set the name (used as column names in this context)
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
    private fields;

    constructor() {}
}

export class Field {
    private readonly name: string;
    private readonly type: string;
    private isNull: boolean = false;
    private hasDefault: string = "";

    constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
    }

    public setNull(bool: boolean = true): this {
        this.isNull = bool;
        return this;
    }

    public setDefault(value: string): this {
        this.hasDefault = value.toString();
        return this;
    }

    public build(): string {
        let query: string[] = [];

        query.push(this.name, this.type);

        if (!this.isNull) {
            query.push("NOT NULL");
        }

        if (this.hasDefault !== "") {
            query.push(`DEFAULT ${this.hasDefault}`);
        }

        return query.join(" ");
    }
}
