import { PoolClient } from "pg";

export default class Model {
    private readonly name: string;
    private readonly instance: PoolClient;

    constructor(name: string, instance: PoolClient) {
        this.name = name;
        this.instance = instance;
    }

    public getAll = async <Resource>(): Promise<Resource[]> => {
        return (
            await this.instance.query(`SELECT * FROM basketball.${this.name}`)
        ).rows;
    };
}
