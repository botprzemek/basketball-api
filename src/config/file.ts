import { access, constants, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as process from "node:process";

type ConfigType = Config.Cache | Config.Database | Config.Server;

const NEWLINES_MATCH = /\r\n|\n|\r/;
const VALUE_MATCH = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;
const ENV_FORMAT = /([a-z])([A-Z])/g;

const format = (key: string, value: string | number, format: RegExp): string =>
    `${key.replace(format, "$1_$2").toUpperCase()}=${value}\n`;

const generate = (config: ConfigType): string[] => {
    const result: string[] = [];
    const stack: Array<{ obj: any; parentKey: string }> = [
        { obj: config, parentKey: "" },
    ];

    while (stack.length > 0) {
        const { obj, parentKey } = stack.pop()!;

        Object.entries(obj).map(([key, value]): void => {
            const fullKey = parentKey ? `${parentKey}_${key}` : key;

            if (typeof value === "object" && value !== null) {
                stack.push({ obj: value, parentKey: fullKey });
                return;
            }

            result.push(format(fullKey, value as string, ENV_FORMAT));
        });
    }

    return result;
};

const read = async (name: string, config: ConfigType): Promise<Buffer> => {
    const path = join(
        dirname(fileURLToPath(import.meta.url)),
        "../..",
        `.env.${name}`,
    );

    try {
        await access(path, constants.R_OK);

        return readFile(path);
    } catch (error) {
        const generated = generate(config).join("");

        await writeFile(path, generated);

        return Buffer.from(generated);
    }
};

const set = (key: string, value: string): string =>
    (process.env[key] = value.toString());

const match = (
    variables: Record<string, string>,
    line: string,
    value: RegExp,
): void => {
    const matches = line.match(value);

    if (!(matches && matches[1] && matches[2])) {
        return;
    }

    variables[matches[1]] = matches[2];
};

const parse = (source: Buffer, splitter: RegExp): Record<string, string> => {
    const variables: Record<string, string> = {};

    source
        .toString()
        .split(splitter)
        .forEach((line: string) => match(variables, line, VALUE_MATCH));

    return variables;
};

export const load = async (name: string, config: ConfigType): Promise<void> => {
    const buffer = await read(name, config);
    const variables = parse(buffer, NEWLINES_MATCH);

    Object.entries(variables)
        .filter(([key, value]) => value && !process.env[key])
        .map(([key, value]) => set(`${name}_${key}`.toUpperCase(), value));
};

export default load;
