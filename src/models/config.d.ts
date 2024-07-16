interface Connection {
    host: string;
    port: number;
}

namespace ConfigType {
    interface Cache extends Connection {
        user: string;
    }

    interface Database extends Connection {
        user: string;
        name: string;
    }

    interface Server extends Connection {
        apiKey: string;
        compression: boolean;
        version: number;
    }
}
