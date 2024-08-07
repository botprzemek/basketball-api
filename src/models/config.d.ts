interface Connection {
    host: string;
    port: number;
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
        tokenKey: string;
        version: number;
    }
}
