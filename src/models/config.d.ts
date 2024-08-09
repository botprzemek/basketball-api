interface Connection {
    host: string;
    port: number;
}

interface Cookie {
    httpOnly: boolean;
    maxAge: number;
    sameSite: "strict" | "lax" | "none";
    secure: boolean;
}

interface Token {
    secret: Secret;
    expiresIn: string;
}

namespace ConfigType {
    interface Cache extends Connection {
        user: string;
        expireTime: number;
    }

    interface Database extends Connection {
        user: string;
        name: string;
    }

    interface Server extends Connection {
        compression: boolean;
        cookie: Cookie;
        token: Token;
        version: number;
    }
}
