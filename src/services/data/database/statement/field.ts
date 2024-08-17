export default class Field {
    private readonly name: string;
    private type: string = "VARCHAR";
    private isPrimary: boolean = false;
    private isForeign: boolean = false;
    private isNotNull: boolean = false;
    private isUnique: boolean = false;
    private hasDefault: string = "";

    constructor(name: string, type: string = "VARCHAR") {
        this.name = name;
        this.type = type;
    }

    public setType = (type: string): this => {
        this.type = type.toUpperCase();

        return this;
    };

    public setPrimary = (primary: boolean = true): this => {
        this.isPrimary = primary;

        return this;
    };

    public setForeign = (foreign: boolean = true): this => {
        this.isForeign = foreign;

        return this;
    };

    public setNotNull = (notNull: boolean = true): this => {
        this.isNotNull = notNull;

        return this;
    };

    public setUnique = (unique: boolean = true): this => {
        this.isUnique = unique;

        return this;
    };

    public setDefault = (value: string): this => {
        this.hasDefault = value.toString();

        return this;
    };

    public getName = (): string => {
        return this.name;
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

        if (this.isUnique) {
            query.push("UNIQUE");
        }

        if (this.hasDefault !== "") {
            query.push(`DEFAULT ${this.hasDefault}`);
        }

        return query.join(" ");
    };
}
