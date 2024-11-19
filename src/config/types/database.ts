import process from "node:process";
import { URL } from "node:url";

import postgres from "postgres";

const DEFAULT = {
    host: "basketball-database-1",
    port: 26257,
    user: "basketball",
    name: "basketball",
} satisfies Config.Database;

export const getConfig = (
    env: NodeJS.ProcessEnv = process.env,
): Config.Database => ({
    host: env.DATABASE_HOST ?? DEFAULT.host,
    port: parseInt(env.DATABASE_PORT ?? `${DEFAULT.port}`),
    user: env.DATABASE_USER ?? DEFAULT.user,
    name: env.DATABASE_NAME ?? DEFAULT.name,
});

export const getUrl = (): string => {
    const { host, port, user, name }: Config.Database = getConfig();
    return new URL(`postgresql://${user}@${host}:${port}/${name}`).toString();
};

export const getOptions = () => {
    return {
        connection: {
            application_name: getConfig().name,
        },
        debug: true,
        idle_timeout: 20,
        max_lifetime: 60 * 30,
        onnotice: (): void => {},
        ssl: false,
        types: {
            bigint: postgres.BigInt,
        },
    };
};

export default {
    getConfig,
    getUrl,
    getOptions,
};
