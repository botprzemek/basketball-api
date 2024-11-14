declare namespace Config {
    type Type = Cache | Database | Server;

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
        environment: string;
        http: Http;
        router: RouterOptions;
        token: Token;
        version: number;
    }

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

    interface Http {
        keepAliveTimeout: number;
        headersTimeout: number;
        maxConnections: number;
        maxHeadersCount: number;
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
}
