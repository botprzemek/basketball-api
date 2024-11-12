import database from "@/services/data/database";
import cache from "@/services/data/cache";
import { failure, success } from "@/utils/error";
import { generate } from "@/utils/password";

import { TransactionSql } from "postgres";

const USER_FIND_FAILED = failure({
    code: 404,
    message: "User not found",
    status: 404,
    title: "",
});

const USER_CREATE_FAILED = failure({
    code: 500,
    message: "Failed to create user",
    status: 500,
    title: "",
});

const USER_CREATE_TAKEN = failure({
    code: 400,
    message: "User name is already taken",
    status: 400,
    title: "",
});

const USER_UPDATE_SUCCESS = success([
    {
        code: 200,
        message: "Successfully updated user",
        status: 200,
        title: "",
    },
]);

const USER_REMOVE_NOT_FOUND = failure({
    code: 404,
    message: "User not found",
    status: 404,
    title: "",
});

const USER_REMOVE_SUCCESS = failure({
    code: 500,
    message: "Failed to remove user",
    status: 500,
    title: "",
});

const insertTransaction = async (
    sql: TransactionSql,
    data: {
        identity: Identity;
        user: User;
    },
): Promise<User> => {
    const [{ id: id }]: [{ id: UUID }] = await sql`
        INSERT INTO identities ${sql(data.identity)} RETURNING id
    `;

    data.user.identity_id = id;
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
    const cached: User[] = await cache.get<User[]>(name);

    if (cached && cached.length > 0) {
        return success(cached);
    }

    const users: User[] = await database.get()<
        User[]
    >`SELECT * FROM users_details`;

    void cache.set(name, users);

    return success(users);
};

export const findById: Resource.FindById = async (
    id: UUID,
): Resource.Return => {
    const cached = await cache.get<User>(`${name}/${id}`);

    if (cached) {
        return success([cached]);
    }

    const [user]: [User?] = await database.get()`SELECT *
                                                     FROM users_details
                                                 WHERE users_details.id = ${id}`;

    if (!user) {
        return USER_FIND_FAILED;
    }

    void cache.set(`${name}/${id}`, user);

    return success([user]);
};

export const findByUsername: Resource.FindByUsername = async (
    username: string,
): Resource.Return => {
    const cached = await cache.get<User[]>(name);

    if (cached) {
        const user = cached.filter((user) => user.username === username).at(0);

        if (user) {
            success([user]);
        }
    }

    const [user]: [User?] = await database.get()`SELECT *
                                                 FROM users_details
                                                 WHERE users_details.username = ${username}`;

    if (!user) {
        return USER_FIND_FAILED;
    }

    void cache.set(`${name}/${user.id}`, user);

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
            return USER_CREATE_FAILED;
        }
    } catch (error: any) {
        switch (error.constraint_name) {
            case "users_username_key": {
                return USER_CREATE_TAKEN;
            }
            default: {
                return USER_CREATE_FAILED;
            }
        }
    }

    void cache.clear([name]);

    const users: User[] = await database.get()<
        User[]
    >`SELECT * FROM users_details`;

    void cache.set(name, users);

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

    void cache.set(`${name}/${id}`, user);

    void cache.clear([name]);

    return USER_UPDATE_SUCCESS;
};

export const remove: Resource.Remove = async (id: UUID): Resource.Return => {
    const [result] =
        await database.get()`UPDATE users SET is_deleted = true, deleted_at = now()
                                          WHERE id = ${id} RETURNING *`;

    if (!result) {
        return USER_REMOVE_NOT_FOUND;
    }

    void cache.clear([name, `${name}/${id}`]);

    return USER_REMOVE_SUCCESS;
};

export default {
    name,
    find,
    findById,
    findByUsername,
    create,
    update,
    remove,
} as Resource;
