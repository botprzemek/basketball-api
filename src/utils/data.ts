import { getEnvironment } from "@/config/types/server";
import cache from "@/stores/cache";

export const wrapper = (data: Entity[] | Exception): Payload => {
    if (!Array.isArray(data)) {
        return {
            data: [],
            error: data,
        };
    }

    return {
        data,
    };
};

export const access = async (key: string, query: Function): Result => {
    try {
        const cached = await cache.get<User.Entity[]>(key);

        if (cached) {
            return wrapper(cached);
        }

        const stored = await query();

        void cache.set<User.Entity[]>(key, stored);

        return wrapper(stored);
    } catch (error) {
        // TODO
        // Error handling

        if (getEnvironment() === "development") {
            console.error(error);
        }

        return wrapper({
            status: 500,
            message: "Internal Server Error",
        });
    }
};

export default {
    wrapper,
    access,
};
