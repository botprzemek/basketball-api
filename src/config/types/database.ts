import process from "node:process";
import { URL } from "node:url";

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
    const { host, port, user, name } = getConfig() satisfies Config.Database;
    return new URL(`postgresql://${user}@${host}:${port}/${name}`).toString();
};

export default {
    getConfig,
    getUrl,
};
