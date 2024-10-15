import database from "@/services/data/database";
import cache from "@/services/data/cache";
import { failure, success } from "@/utils/error";
import { generate } from "@/utils/password";

export const find = async (id?: string): Promise<Data> => {
    if (!id) {
        const cached = await cache.get("users");

        if (cached && cached.length > 0) {
            return success(cached);
        }

        const users: User[] = await database.get()<User[]>`SELECT * FROM users`;

        void cache.set("users", users);

        return success(users);
    }

    const cached = await cache.getOne(`users/${id}`);

    if (cached) {
        return success([cached]);
    }

    const [user]: [User?] = await database.get()`SELECT *
                                                     FROM users
                                                 WHERE users.id = ${id}`;

    if (!user) {
        return failure({
            code: 404,
            message: "",
            status: 404,
            title: "User not found",
        });
    }

    void cache.set(`users/${id}`, user);

    return success([user]);
};

export const create = async (users: User[]): Promise<Data> => {
    users.map((user: User): User => {
        user.password = generate(user.password);
        delete user.id;
        return user;
    });

    const result = await database.get()<
        User[]
    >`INSERT INTO users ${database.get()(users)} RETURNING *`;

    void cache.clear(["users"]);

    if (!result) {
        return failure({
            code: 500,
            message: "",
            status: 500,
            title: "Failed to create User",
        });
    }

    const refreshed: User[] = await database.get()<User[]>`SELECT *
                                 FROM users`;

    void cache.set("users", refreshed);

    return success(refreshed);
};

export const update = async (id: string, user: User): Promise<Data> => {
    user.password = generate(user.password);
    delete user.id;

    const [updated]: [User?] = await database.get()`
        UPDATE users SET ${database.get()(user)} WHERE users.id = ${id} RETURNING *`;

    if (!updated) {
        return failure({
            code: 500,
            message: "",
            status: 500,
            title: "Failed to update User",
        });
    }

    void cache.set(`users/${id}`, updated);

    const users: User[] = await database.get()<User[]>`SELECT *
                                 FROM users`;

    void cache.set("users", users);

    return success(users);
};

export const remove = async (id: string): Promise<Data> => {
    const [result] = await database.get()`DELETE
                                                FROM users
                                          WHERE users.id = ${id} RETURNING *`;

    if (!result) {
        return failure({
            code: 500,
            message: "",
            status: 500,
            title: "Failed to remove User",
        });
    }

    void cache.clear(["users", `users/${id}`]);

    return success({
        code: 200,
        message: "",
        status: 200,
        title: "Successfully removed User",
    });
};

export default { find, create, update, remove };
