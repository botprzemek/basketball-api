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

interface Router {
    mergeParams: boolean;
}

interface TokenOptions {
    expiresIn: string;
}

interface Token {
    secret: Secret;
    refreshOptions: TokenOptions;
    accessOptions: TokenOptions;
}

declare namespace Config {
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
        router: Router;
        token: Token;
        version: number;
    }
}
