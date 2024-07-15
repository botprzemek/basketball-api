import Config from "@/config";

export default class Server extends Config {
    private readonly DEFAULT: ConfigType.Server;

    constructor() {
        const DEFAULT: ConfigType.Server = {
            compression: true,
            host:
                process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1",
            port: 3000,
            version: 1,
        };

        super("server", DEFAULT);

        this.DEFAULT = DEFAULT;
    }

    public get = (): ConfigType.Server => {
        return {
            compression: this.getCompression(),
            host: this.getHost(),
            port: this.getPort(),
            version: this.getVersion(),
        };
    };

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

    public getVersion = (): number => {
        return parseInt(
            process.env.SERVER_VERSION ?? `${this.DEFAULT.version}`,
        );
    };
}
