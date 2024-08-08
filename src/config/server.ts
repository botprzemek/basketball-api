import Config from "@/config";

import jwt from "jsonwebtoken";

export default class Server extends Config {
    private readonly DEFAULT: ConfigType.Server;

    constructor() {
        const DEFAULT: ConfigType.Server = {
            compression: true,
            expireTime: "30m",
            host:
                process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1",
            port: 3000,
            tokenKey: "your-token-key",
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

    public getHost = (): string => {
        return process.env.SERVER_HOST ?? this.DEFAULT.host;
    };

    public getPort = (): number => {
        return parseInt(process.env.SERVER_PORT ?? `${this.DEFAULT.port}`);
    };

    public getTokenKey = (): jwt.Secret => {
        return process.env.SERVER_TOKEN_KEY ?? this.DEFAULT.tokenKey;
    };

    public getTokenOptions = (): jwt.SignOptions => {
        return {
            expiresIn:
                process.env.SERVER_EXPIRE_TIME ?? this.DEFAULT.expireTime,
        };
    };

    public getVersion = (): number => {
        return parseInt(
            process.env.SERVER_VERSION ?? `${this.DEFAULT.version}`,
        );
    };
}
