import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const KEY_LENGTH: number = 64;
const ENCODING: BufferEncoding = "hex";
const OPTIONS: PasswordOptions = {
    keyLength: KEY_LENGTH,
    encoding: ENCODING,
};

const generateSalt = ({ keyLength, encoding }: PasswordOptions = OPTIONS): string =>
    randomBytes(keyLength * 0.25).toString(encoding);

const generateHash = (password: string, salt: string, { keyLength, encoding }: PasswordOptions = OPTIONS): string =>
    scryptSync(password, salt, keyLength).toString(encoding);

export const generate = (password: string): string => {
    const salt: string = generateSalt();
    return `${generateHash(password, salt)}.${salt}`;
};

export const compare = (storedHash: string, suppliedPassword: string): boolean => {
    const [password, salt] = storedHash.split(".");

    if (!password || !salt) {
        return false;
    }

    const storedBuf: Buffer = Buffer.from(password, ENCODING);
    const suppliedBuf: Buffer = scryptSync(suppliedPassword, salt, KEY_LENGTH);

    return timingSafeEqual(storedBuf, suppliedBuf);
};
