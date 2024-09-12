import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import * as process from "node:process";
import { fileURLToPath } from "node:url";

type ConfigType = Config.Cache | Config.Database | Config.Server;

const NEWLINES_MATCH: RegExp = /\r\n|\n|\r/;
const VALUE_MATCH: RegExp = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;
const ENV_FORMAT: RegExp = /([a-z])([A-Z])/g;

const format = (key: string, value: string | number, format: RegExp): string =>
    `${key.replace(format, "$1_$2").toUpperCase()}=${value}\n`;

const generate = (config: ConfigType): string[] => {
    const result: string[] = [];
    const stack: Array<{ obj: any; parentKey: string }> = [{ obj: config, parentKey: "" }];

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

const read = (name: string, config: ConfigType): Buffer => {
    const path: string = join(dirname(fileURLToPath(import.meta.url)), "../..", `.env.${name}`);

    if (existsSync(path)) {
        return readFileSync(path);
    }

    const generated: string = generate(config).join("");

    writeFileSync(path, generated);

    return Buffer.from(generated);
};

const set = (key: string, value: string): string => (process.env[key] = value.toString());

const match = (variables: Record<string, string>, line: string, value: RegExp): void => {
    const matches: RegExpMatchArray | null = line.match(value);

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

export const load = (name: string, config: ConfigType): void => {
    const buffer: Buffer = read(name, config);
    const variables: Record<string, string> = parse(buffer, NEWLINES_MATCH);

    Object.entries(variables)
        .filter(([key, value]) => value && !process.env[key])
        .map(([key, value]) => set(`${name}_${key}`.toUpperCase(), value));
};
