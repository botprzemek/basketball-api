import Config from "@/config";

import { URL } from "node:url";

export default class Database extends Config {
    private readonly DEFAULT: ConfigType.Database = {
        host: "cockroach",
        port: 26257,
        user: "root",
        name: "defaultdb",
    };

    constructor() {
        const DEFAULT: ConfigType.Database = {
            host: "cockroach",
            port: 26257,
            user: "root",
            name: "defaultdb",
        };

        super("database", DEFAULT);

        this.DEFAULT = DEFAULT;
    }

    public getUrl = (): { connectionString: string } => {
        const connectionString: string = new URL(
            `postgresql://${this.getUser()}@${this.getHost()}:${this.getPort()}/${this.getName()}?sslmode=disable&application_name=basketball`,
        ).toString();

        return {
            connectionString,
        };
    };

    private getHost = (): string => {
        return process.env.DATABASE_HOST ?? this.DEFAULT.host;
    };

    private getPort = (): number => {
        return parseInt(process.env.DATABASE_PORT ?? `${this.DEFAULT.port}`);
    };

    private getUser = (): string => {
        return process.env.DATABASE_USER ?? this.DEFAULT.user;
    };

    private getName = (): string => {
        return process.env.DATABASE_NAME ?? this.DEFAULT.name;
    };
}
