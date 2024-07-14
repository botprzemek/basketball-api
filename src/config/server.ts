import Config from "@/config";

export default class Server extends Config {
    private static readonly DEFAULT: ConfigType.Server = {
        host: process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1",
        port: 3000,
        version: 1,
    };

    constructor() {
        super("server", Server.DEFAULT);
    }

    public static get = (): ConfigType.Server => {
        return {
            host: this.getHost(),
            port: this.getPort(),
            version: this.getVersion(),
        };
    };

    public static getHost = (): string => {
        return process.env.SERVER_HOST ?? this.DEFAULT.host;
    };

    public static getPort = (): number => {
        return parseInt(process.env.SERVER_PORT ?? `${this.DEFAULT.port}`);
    };

    public static getVersion = (): number => {
        return parseInt(
            process.env.SERVER_VERSION ?? `${this.DEFAULT.version}`,
        );
    };
}
