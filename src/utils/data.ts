import cache from "@/stores/cache";

export const wrap = (data: Data): Payload => {
    if (Array.isArray(data)) {
        return {
            data,
        };
    }

    return {
        data: [],
        error: data,
    };
};

export const access = async (key: string, query: Query): Result => {
    try {
        const cached = await cache.get(key);

        if (cached) {
            return wrap(cached);
        }

        const stored = await query();

        void cache.set(key, stored);

        return wrap(stored);
    } catch (error) {
        // TODO ERROR HANDLING

        if (error instanceof Error) {
            return wrap({
                status: 500,
                message: error.message,
            });
        }

        return wrap({
            status: 500,
            message: "Internal Server Error",
        });
    }
};

export const NOT_IMPLEMENTED = new Promise<Payload>(() =>
    wrap({
        status: 501,
        message: "Function not implemented",
    }),
) satisfies Result;

export default {
    wrap,
    access,
    NOT_IMPLEMENTED,
};
