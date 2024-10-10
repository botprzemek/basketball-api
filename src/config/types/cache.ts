import { load } from "@/config";

import process from "node:process";
import { URL } from "node:url";

const DEFAULT: Config.Cache = {
    host: "basketball-cache",
    port: 6379,
    user: "default",
    expireTime: 60 * 60,
};

const getConfig = (env: NodeJS.ProcessEnv = process.env): Config.Cache => ({
    host: env.CACHE_HOST ?? DEFAULT.host,
    port: parseInt(env.CACHE_PORT ?? `${DEFAULT.port}`),
    user: env.CACHE_USER ?? DEFAULT.user,
    expireTime: parseInt(env.CACHE_EXPIRE_TIME ?? `${DEFAULT.expireTime}`),
});

load("cache", getConfig());

export const getUrl = (): string => {
    const { host, port, user }: Config.Cache = getConfig();
    return new URL(`redis://${user}@${host}:${port}`).toString();
};

export const getExpireTime = (): number => getConfig().expireTime;

export default {
    getUrl,
    getExpireTime,
};
