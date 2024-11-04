import database from "@/services/data/database";
import cache from "@/services/data/cache";
import { failure, success } from "@/utils/error";
import { generate } from "@/utils/password";

import { TransactionSql } from "postgres";

const insertTransaction = async (
    sql: TransactionSql,
    data: {
        identity: Identity;
        user: User;
    },
): Promise<User> => {
    const [{ id: identityId }]: [{ id: UUID }] = await sql`
        INSERT INTO identities ${sql(data.identity)} RETURNING id
    `;

    data.user.identity_id = identityId;
    data.user.password = generate(data.user.password);
    data.user.verification_token = generate(data.user.password);

    const [user]: [User] = await sql`
        INSERT INTO users ${sql(data.user)} RETURNING *
    `;

    return user;
};

const updateTransaction = async (
    sql: TransactionSql,
    data: {
        identity: Identity;
        user: User;
    },
): Promise<User> => {
    await sql`
        UPDATE identities 
        SET ${sql(data.identity)} 
        WHERE id = ${data.user.identity_id}
    `;

    const updatedUser = {
        ...data.user,
    };

    if (data.user.password) {
        updatedUser.password = generate(data.user.password);
    }

    const [user]: [User] = await sql`
        UPDATE users
        SET ${sql(updatedUser)}
        WHERE id = ${data.user.id}
        RETURNING *
    `;

    return user;
};

export const name: Resource.Type = "users";

export const find: Resource.Find = async (): Resource.Return => {
    const cached: User[] = await cache.get<User[]>("users");

    if (cached && cached.length > 0) {
        return success(cached);
    }

    const users: User[] = await database.get()<
        User[]
    >`SELECT * FROM users_details`;

    void cache.set("users", users);

    return success(users);
};

export const findById: Resource.FindById = async (
    id: UUID,
): Resource.Return => {
    const cached = await cache.get<User>(`users/${id}`);

    if (cached) {
        return success([cached]);
    }

    const [user]: [User?] = await database.get()`SELECT *
                                                     FROM users_details
                                                 WHERE users_details.id = ${id}`;

    if (!user) {
        return failure({
            code: 404,
            message: "User not found",
            status: 404,
            title: "",
        });
    }

    void cache.set(`users/${id}`, user);

    return success([user]);
};

export const create: Resource.Create = async (data: {
    identity: Identity;
    user: User;
}): Resource.Return => {
    try {
        const result: User = await database
            .get()
            .begin(
                async (sql: TransactionSql): Promise<User> =>
                    insertTransaction(sql, data),
            );

        if (!result) {
            return failure({
                code: 500,
                message: "Failed to create user",
                status: 500,
                title: ",
            });
        }
    } catch (error: any) {
        console.log(error.constraint_name);

        if (error.constraint_name === "users_username_key") {
            return failure({
                code: 400,
                message: "Username is already taken",
                status: 400,
                title: ",
            });
        }

        return failure({
            code: 500,
            message: "Failed to create user",
            status: 500,
            title: "",
        });
    }

    void cache.clear(["users"]);

    const users: User[] = await database.get()<
        User[]
    >`SELECT * FROM users_details`;

    void cache.set("users", users);

    return success(users);
};

export const update: Resource.Update = async (
    id: string,
    data: {
        identity: Identity;
        user: User;
    },
): Resource.Return => {
    const result: User = await database
        .get()
        .begin(
            async (sql: TransactionSql): Promise<User> =>
                updateTransaction(sql, data),
        );

    if (!result) {
        return failure({
            code: 404,
            message: "User not found",
            status: 404,
            title: "",
        });
    }

    const user: User[] = await database.get()<User[]>`SELECT *
                                 FROM users_details WHERE id = ${id}`;

    void cache.set(`users/${id}`, user);

    void cache.clear(["users"]);

    return success([
        {
            code: 200,
            message: "Successfully updated user",
            status: 200,
            title: "",
        },
    ]);
};

export const remove: Resource.Remove = async (id: string): Resource.Return => {
    const [result] = await database.get()`DELETE
                                                FROM users
                                          WHERE users.id = ${id} RETURNING *`;

    if (!result) {
        return failure({
            code: 404,
            message: "User not found",
            status: 404,
            title: "",
        });
    }

    void cache.clear(["users", `users/${id}`]);

    return success([
        {
            code: 200,
            message: "Successfully removed user",
            status: 200,
            title: "",
        },
    ]);
};

export default {
    name,
    find,
    findById,
    create,
    update,
    remove,
} as Resource;
