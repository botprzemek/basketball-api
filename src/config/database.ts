import Config from "@/config";

import { URL } from "node:url";

export default class Database extends Config {
    private static readonly DEFAULT: ConfigType.Database = {
        host: "cockroach",
        port: 26257,
        user: "root",
        name: "defaultdb",
    };

    constructor() {
        super("database", Database.DEFAULT);
    }

    public static getUrl = (): { connectionString: string } => {
        const connectionString: string = new URL(
            `postgresql://${this.getUser()}@${this.getHost()}:${this.getPort()}/${this.getName()}?sslmode=disable&application_name=basketball`,
        ).toString();
        return {
            connectionString,
        };
    };

    private static getHost = (): string => {
        return process.env.DATABASE_HOST ?? this.DEFAULT.host;
    };

    private static getPort = (): number => {
        return parseInt(process.env.DATABASE_PORT ?? `${this.DEFAULT.port}`);
    };

    private static getUser = (): string => {
        return process.env.DATABASE_USER ?? this.DEFAULT.user;
    };

    private static getName = (): string => {
        return process.env.DATABASE_NAME ?? this.DEFAULT.name;
    };
}
