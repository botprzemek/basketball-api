import Config from "@/config";

export default class Cache extends Config {
    private static readonly DEFAULT: ConfigType.Cache = {
        host: "redis",
        port: 6379,
        user: "default",
    };

    constructor() {
        super("cache", Cache.DEFAULT);
    }

    public static get = (): ConfigType.Cache => {
        return {
            host: this.getHost(),
            port: this.getPort(),
            user: this.getUser(),
        };
    };

    public static getHost = (): string => {
        return process.env.CACHE_HOST ?? this.DEFAULT.host;
    };

    public static getPort = (): number => {
        return parseInt(process.env.CACHE_PORT ?? `${this.DEFAULT.port}`);
    };

    public static getUser = (): string => {
        return process.env.CACHE_USER ?? this.DEFAULT.user;
    };
}
