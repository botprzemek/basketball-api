import CacheConfig from "@/config/cache";
import DatabaseConfig from "@/config/database";
import Resource from "@/server/resource";

import pg from "pg";
import { Redis } from "ioredis";

class QueryBuilder {}

export default class Model {
    private readonly resource: Resource;

    constructor(resource: Resource) {
        this.resource = resource;
    }

    public get = async <T>(): Promise<T[]> => {
        const cache = new Redis(CacheConfig.get());

        const cachedResponse = await cache.get(this.resource);

        if (cachedResponse) {
            console.log("Cache hit!");

            return JSON.parse(cachedResponse);
        }

        const database = new pg.Pool(DatabaseConfig.getUrl());

        let data: T[] = [];

        const client = await database.connect();

        const statement = `SELECT * FROM ${this.resource};`;

        const databaseResponse = await client.query(statement);

        if (databaseResponse.rows.length !== 0) {
            console.log("Database read!");

            data = data.concat(databaseResponse.rows);

            await cache.set(this.resource, JSON.stringify(data), "EX", 10);

            client.release();
        }

        return data;
    };

    public create = async <T>(data: T[]): Promise<void> => {
        const database = new pg.Pool(DatabaseConfig.getUrl());

        const client = await database.connect();

        for (const instance of data) {
            const statement = `INSERT INTO ${this.resource} (team_id, name, lastname, nationality, number, height, weight, wingspan, position, birth_date, starter) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;

            await client.query(statement, Object.values(instance as Object));
        }

        client.release();
    };

    public update = async <T>(data: T[]): Promise<void> => {
        console.log(data);
    };

    public delete = async <T>(data: T[]): Promise<void> => {
        console.log(data);
    };
}
