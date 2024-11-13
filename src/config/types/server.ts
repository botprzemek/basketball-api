import process from "node:process";

const DEFAULT: Config.Server = {
    compression: true,
    cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
        secure: false,
    },
    environment: "production",
    host: process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1",
    http: {
        keepAliveTimeout: 100,
        headersTimeout: 65000,
        maxConnections: 10000,
        maxHeadersCount: 1000,
    },
    port: 3000,
    router: {
        mergeParams: true,
    },
    token: {
        secret: "your-token-secret",
        refreshOptions: {
            expiresIn: "1w",
        },
        accessOptions: {
            expiresIn: "1h",
        },
    },
    version: 1,
};

export const getConfig = (
    env: NodeJS.ProcessEnv = process.env,
): Config.Server => ({
    compression: /true/.test(`${env.SERVER_COMPRESSION}`)
        ? false
        : DEFAULT.compression,
    cookie: {
        httpOnly: /true/.test(`${env.SERVER_COOKIE_HTTP_ONLY}`)
            ? false
            : DEFAULT.cookie.httpOnly,
        maxAge: parseInt(
            env.SERVER_COOKIE_MAX_AGE ?? `${DEFAULT.cookie.maxAge}`,
        ),
        sameSite: env.SERVER_COOKIE_SAME_SITE ?? DEFAULT.cookie.sameSite,
        secure: /true/.test(`${env.SERVER_COOKIE_SECURE}`)
            ? false
            : DEFAULT.cookie.secure,
    } as Cookie,
    environment: process.env.NODE_ENV
        ? process.env.NODE_ENV
        : DEFAULT.environment,
    host: env.SERVER_HOST ?? DEFAULT.host,
    http: {
        keepAliveTimeout: parseInt(
            env.SERVER_HTTP_KEEP_ALIVE_TIMEOUT ??
                `${DEFAULT.http.keepAliveTimeout}`,
        ),
        headersTimeout: parseInt(
            env.SERVER_HTTP_HEADERS_TIMEOUT ?? `${DEFAULT.http.headersTimeout}`,
        ),
        maxConnections: parseInt(
            env.SERVER_HTTP_MAX_CONNECTIONS ?? `${DEFAULT.http.maxConnections}`,
        ),
        maxHeadersCount: parseInt(
            env.SERVER_HTTP_MAX_HEADERS_COUNT ??
                `${DEFAULT.http.maxHeadersCount}`,
        ),
    },
    port: parseInt(env.SERVER_PORT ?? `${DEFAULT.port}`),
    router: {
        mergeParams: /true/.test(`${process.env.SERVER_ROUTER_MERGE_PARAMS}`)
            ? false
            : DEFAULT.router.mergeParams,
    },
    token: {
        secret: env.SERVER_TOKEN_SECRET ?? DEFAULT.token.secret,
        refreshOptions: {
            expiresIn:
                env.SERVER_TOKEN_REFRESH_OPTIONS_EXPIRES_IN ??
                DEFAULT.token.refreshOptions.expiresIn,
        },
        accessOptions: {
            expiresIn:
                env.SERVER_TOKEN_ACCESS_OPTIONS_EXPIRES_IN ??
                DEFAULT.token.accessOptions.expiresIn,
        },
    },
    version: parseInt(env.SERVER_VERSION ?? `${DEFAULT.version}`),
});

export const useCompression = (): boolean => getConfig().compression;

export const getAddress = (): Connection => ({
    host: getConfig().host,
    port: getConfig().port,
});

export const getCookie = (): Cookie => getConfig().cookie;

export const getEnvironment = (): string => getConfig().environment;

export const getHttp = (): Http => getConfig().http;

export const getRouterOptions = (): Router => getConfig().router;

export const getToken = (): Token => getConfig().token;

export const getVersion = (): number => getConfig().version;

export default {
    getConfig,
    useCompression,
    getAddress,
    getCookie,
    getEnvironment,
    getRouterOptions,
    getToken,
    getVersion,
};
