export default class Field {
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
