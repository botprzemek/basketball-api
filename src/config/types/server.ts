import { load } from "@/config";

import process from "node:process";

const DEFAULT: Config.Server = {
    compression: true,
    cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
        secure: false,
    },
    host: process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1",
    port: 3000,
    router: {
        mergeParams: true,
    },
    token: {
        secret: "your-token-secret",
        expiresIn: "1d",
    },
    version: 1,
};

const getConfig = (env: NodeJS.ProcessEnv = process.env): Config.Server => ({
    compression: /true/.test(`${env.SERVER_COMPRESSION}`) ? false : DEFAULT.compression,
    cookie: {
        httpOnly: /true/.test(`${env.SERVER_COOKIE_HTTP_ONLY}`) ? false : DEFAULT.cookie.httpOnly,
        maxAge: parseInt(env.SERVER_COOKIE_MAX_AGE ?? `${DEFAULT.cookie.maxAge}`),
        sameSite: env.SERVER_COOKIE_SAME_SITE ?? DEFAULT.cookie.sameSite,
        secure: /true/.test(`${env.SERVER_COOKIE_SECURE}`) ? false : DEFAULT.cookie.secure,
    } as Cookie,
    host: env.SERVER_HOST ?? DEFAULT.host,
    port: parseInt(env.SERVER_PORT ?? `${DEFAULT.port}`),
    router: {
        mergeParams: /true/.test(`${process.env.SERVER_ROUTER_MERGE_PARAMS}`) ? false : DEFAULT.router.mergeParams,
    },
    token: {
        secret: env.SERVER_TOKEN_SECRET ?? DEFAULT.token.secret,
        expiresIn: env.SERVER_TOKEN_EXPIRES_IN ?? DEFAULT.token.expiresIn,
    },
    version: parseInt(env.SERVER_VERSION ?? `${DEFAULT.version}`),
});

load("server", getConfig());

export const useCompression = (): boolean => getConfig().compression;

export const getCookie = (): Cookie => getConfig().cookie;

export const getAddress = (): Connection => ({ host: getConfig().host, port: getConfig().port });

export const getRouter = (): Router => getConfig().router;

export const getToken = (): Token => getConfig().token;

export const getVersion = (): number => getConfig().version;
