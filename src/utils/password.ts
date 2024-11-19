import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const OPTIONS = {
    keyLength: 64,
    encoding: "hex",
} satisfies PasswordOptions;

const generateSalt = ({
    keyLength,
    encoding,
}: PasswordOptions): string =>
    randomBytes(keyLength * 0.25).toString(encoding);

const generateHash = (
    password: string,
    salt: string,
    { keyLength, encoding }: PasswordOptions,
): string => scryptSync(password, salt, keyLength).toString(encoding);

export const generate = (password: string): string => {
    const salt: string = generateSalt(OPTIONS);
    return `${generateHash(password, salt, OPTIONS)}.${salt}`;
};

export const compare = (
    storedHash: string,
    suppliedPassword: string,
): boolean => {
    const [password, salt] = storedHash.split(".");

    if (!password || !salt) {
        return false;
    }

    const storedBuf = Buffer.from(password, OPTIONS.encoding);
    const suppliedBuf = scryptSync(suppliedPassword, salt, OPTIONS.keyLength);

    return timingSafeEqual(storedBuf, suppliedBuf);
};

export default {
    generate,
    compare,
};
