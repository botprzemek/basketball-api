import database from "@/services/data/database";
import cache from "@/services/data/cache";
import { failure, success } from "@/utils/error";
import { generate } from "@/utils/password";
import { TransactionSql } from "postgres";

export const find = async (): Promise<Data> => {
    const cached: User[] = await cache.get<User[]>("users");

    if (cached && cached.length > 0) {
        return success(cached);
    }

    const users: User[] = await database.get()<User[]>`SELECT * FROM users`;

    void cache.set("users", users);

    return success(users);
};

export const findById = async (id: UUID): Promise<Data> => {
    const cached = await cache.get<User>(`users/${id}`);

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

export const create = async (data: User): Promise<Data> => {
    const result: User = await database
        .get()
        .begin(async (sql: TransactionSql): Promise<User> => {
            data.password = generate(data.password);

            const [identity]: [Identity] = await sql`
                INSERT INTO identities ${sql(data.identity)} RETURNING *
            `;

            delete data.identity;

            const [user]: [User] = await sql`
                INSERT INTO users ${sql({
                    ...data,
                    identity_id: identity.id,
                })} RETURNING *
            `;

            return {
                ...user,
                identity,
            };
        });

    console.log(result);

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

    return success([
        {
            code: 200,
            message: "",
            status: 200,
            title: "Successfully removed User",
        },
    ]);
};

export default { find, create, update, remove };
