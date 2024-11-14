import database from "@/services/database";
import cache from "@/services/cache";
import { wrapper } from "@/utils/wrapper";

export const find = async (): User.Result => {
    try {
        const cached = await cache.get<User.Entity[]>("users");

        if (cached) {
            return wrapper(cached);
        }

        const stored = await database.get()<User.Entity[]>`SELECT *
                                                           FROM basketball.users_details`;

        void cache.set("users", stored);

        return wrapper(stored);
    } catch (error) {
        return wrapper({
            status: 500,
            message: "Internal Server Error",
        });
    }
};

export const controller: User.Controller = {
    find,
};

export default controller;
