import Config from "@/config";

import jwt from "jsonwebtoken";

export default class Server extends Config {
    private readonly DEFAULT: ConfigType.Server;

    constructor() {
        const DEFAULT: ConfigType.Server = {
            compression: true,
            cookie: {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: "strict",
                secure: true,
            },
            host:
                process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1",
            port: 3000,
            token: {
                secret: "your-token-secret",
                expiresIn: "1d",
            },
            version: 1,
        };

        super("server", DEFAULT);

        this.DEFAULT = DEFAULT;
    }

    public getCompression = (): boolean => {
        return Boolean.apply(
            process.env.SERVER_COMPRESSION ?? this.DEFAULT.compression,
        );
    };

    public getCookieOptions = (): Cookie => {
        console.log(
            Boolean.apply(process.env.SERVER_COOKIE_HTTP_ONLY) ??
                this.DEFAULT.cookie.httpOnly,
        );

        return <Cookie>{
            httpOnly: Boolean.apply(
                process.env.SERVER_COOKIE_HTTP_ONLY ??
                    this.DEFAULT.cookie.httpOnly,
            ),
            maxAge: parseInt(
                process.env.SERVER_COOKIE_MAX_AGE ??
                    `${this.DEFAULT.cookie.maxAge}`,
            ),
            sameSite:
                process.env.SERVER_COOKIE_SAME_SITE ??
                this.DEFAULT.cookie.sameSite,
            secure: Boolean.apply(
                process.env.SERVER_COOKIE_SECURE ?? this.DEFAULT.cookie.secure,
            ),
        };
    };

    public getHost = (): string => {
        return process.env.SERVER_HOST ?? this.DEFAULT.host;
    };

    public getPort = (): number => {
        return parseInt(process.env.SERVER_PORT ?? `${this.DEFAULT.port}`);
    };

    public getTokenSecret = (): jwt.Secret => {
        return process.env.SERVER_TOKEN_SECRET ?? this.DEFAULT.token.secret;
    };

    public getTokenOptions = (): jwt.SignOptions => {
        return {
            expiresIn:
                process.env.SERVER_TOKEN_EXPIRES_IN ??
                this.DEFAULT.token.expiresIn,
        };
    };

    public getVersion = (): number => {
        return parseInt(
            process.env.SERVER_VERSION ?? `${this.DEFAULT.version}`,
        );
    };
}
