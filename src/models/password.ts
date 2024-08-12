import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

export default class Password {
    public hash = async (password: string): string => {
        const salt = randomBytes(16).toString("hex");
        const buf = scryptSync(password, salt, 64) as Buffer;
        return `${buf.toString("hex")}.${salt}`;
    };

    public compare = async (
        storedPassword: string,
        suppliedPassword: string,
    ): Promise<boolean> => {
        const [hashedPassword, salt] = storedPassword.split(".");
        const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
        const suppliedPasswordBuf = scryptSync(
            suppliedPassword,
            salt,
            64,
        ) as Buffer;

        return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
    };
}
