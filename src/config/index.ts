import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import * as process from "node:process";
import { fileURLToPath } from "node:url";

type ConfigTypeType =
    | ConfigType.Cache
    | ConfigType.Database
    | ConfigType.Server;

export default class Config {
    private readonly NEWLINES_MATCH: RegExp = /\r\n|\n|\r/;
    private readonly VALUE_MATCH: RegExp = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;

    private readonly name: string;
    private readonly config: ConfigTypeType;

    constructor(name: string, config: ConfigTypeType) {
        this.name = name.toLowerCase();
        this.config = config;

        this.load();
    }

    private load = (): void => {
        const buffer: Buffer = this.read();
        const variables: Record<string, string> = this.parse(buffer);

        Object.entries(variables).forEach(([key, value]) => {
            if (!value) {
                return;
            }

            this.set(`${this.name}_${key}`.toUpperCase(), value);
        });
    };

    private generate = (config: ConfigTypeType): string[] => {
        const result: string[] = [];
        const stack: Array<{ obj: any; parentKey: string }> = [
            { obj: config, parentKey: "" },
        ];

        while (stack.length > 0) {
            const { obj, parentKey } = stack.pop()!;

            for (const [key, value] of Object.entries(obj)) {
                const fullKey = parentKey ? `${parentKey}_${key}` : key;

                if (typeof value === "object" && value !== null) {
                    stack.push({ obj: value, parentKey: fullKey });
                } else {
                    result.push(this.format(fullKey, value as string));
                }
            }
        }

        return result;
    };

    private format(key: string, value: string | number): string {
        return `${key.replace(/([a-z])([A-Z])/g, "$1_$2").toUpperCase()}=${value}\n`;
    }

    private match = (variables: Record<string, string>, line: string): void => {
        const matches: RegExpMatchArray | null = line.match(this.VALUE_MATCH);

        if (!(matches && matches[1] && matches[2])) {
            return;
        }

        variables[matches[1]] = matches[2];
    };

    private read = (): Buffer => {
        const path: string = join(
            dirname(fileURLToPath(import.meta.url)),
            "../..",
            `.env.${this.name}`,
        );

        if (!existsSync(path)) {
            const generated: string = this.generate(this.config).join("");

            writeFileSync(path, generated);

            return Buffer.from(generated);
        }

        return readFileSync(path);
    };

    private set = (key: string, value: string): void => {
        if (process.env[key] || process.env[key] === value) {
            return;
        }

        process.env[key] = value.toString();
    };

    private parse = (source: Buffer): Record<string, string> => {
        const variables: Record<string, string> = {};

        source
            .toString()
            .split(this.NEWLINES_MATCH)
            .forEach((line: string) => this.match(variables, line));

        return variables;
    };
}
