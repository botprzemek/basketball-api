import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

export default class Password {
    private static KEY_LENGTH: number = 64;
    private static ENCODING: BufferEncoding = "hex";

    public static hash = (password: string): string => {
        const salt = randomBytes(16).toString(this.ENCODING);
        const buf = scryptSync(password, salt, this.KEY_LENGTH);
        return `${buf.toString("hex")}.${salt}`;
    };

    public static compare = (
        hash: string,
        supplied: string,
    ): boolean => {
        const [hashed, salt] = hash.split(".");

        if (!hashed || !salt) {
            return false;
        }

        const hashedBuf: Buffer = Buffer.from(hashed, this.ENCODING);
        const suppliedBuf: Buffer = scryptSync(
            supplied,
            salt,
            this.KEY_LENGTH,
        );

        return timingSafeEqual(hashedBuf, suppliedBuf);
    };
}
