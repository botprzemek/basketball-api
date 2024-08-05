import Database from "@/services/data/database/index";

export default class PlayerModel {
    constructor() {}

    public initialize = async () => {
        const database: Database = new Database();

        const instance = await database.get();

        await instance.query(`CREATE DATABASE IF NOT EXISTS basketball;`);

        await instance.query(
            `CREATE TYPE IF NOT EXISTS basketball.POSITION_ENUM AS ENUM ('PG', 'SG', 'SF', 'PF', 'C');`,
        );

        await instance.query(`CREATE TABLE IF NOT EXISTS basketball.players (
            id SERIAL PRIMARY KEY,
            team_id SERIAL,
            name VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            nationality VARCHAR(8) NOT NULL,
            number INT NOT NULL,
            height FLOAT NOT NULL,
            weight FLOAT,
            wingspan FLOAT,
            position basketball.POSITION_ENUM NOT NULL,
            birth_date DATE NOT NULL,
            starter BOOLEAN NOT NULL DEFAULT FALSE);`);
    };
}
