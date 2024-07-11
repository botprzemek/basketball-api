import { DEFAULT, load } from "@/config";

export function getConfig(): Config.Server {
    load("SERVER");

    return {
        HOST: process.env.SERVER_HOST || DEFAULT.SERVER.HOST,
        PORT: parseInt(process.env.SERVER_PORT || `${DEFAULT.SERVER.PORT}`),
        VERSION: parseInt(
            process.env.SERVER_VERSION || `${DEFAULT.SERVER.VERSION}`,
        ),
    };
}
