import * as database from "@/services/data/database";
import * as cache from "@/services/data/cache";
import { failure, isFailure, success } from "@/utils/error";
import { generate } from "@/utils/password";
import filter from "@/utils/filter";
import postgres from "postgres";

export const find = async (): Promise<Data<User[]>> => {
    try {
        const cached: User[] = await cache.get("users");

        if (cached && cached.length > 0) {
            return success(cached);
        }

        return success(
            await database.get()<User[]>`SELECT *
                                     FROM users`,
        );
    } catch (error) {
        if (error instanceof postgres.PostgresError) {
            return failure({
                code: 500,
                message: "",
                status: 500,
                title: "Database error",
            });
        }

        return failure({
            code: 500,
            message: (error as Error).message,
            status: 500,
            title: "Server error",
        });
    }
};

export const findById = async (id: string): Promise<Data<User[]>> => {
    const cached: User = await cache.getOne(`users/${id}`);

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

    return success([user]);
};

export const create = async (users: User[]): Promise<void> => {
    const test: any = users
        .map((user: User) => filter(user, ["id"]))
        .map((user: User) => ({
            ...user,
            password: generate(user.password),
        }));

    const result = await database.get()<
        User[]
    >`INSERT INTO users ${database.get()(test)} RETURNING *`;

    void cache.clear(["users"]);
};

export const update = async (id: string, user: User): Promise<Data<User[]>> => {
    user.password = generate(user.password);
    delete user.id;

    const [updated]: [User?] =
        await database.get()`UPDATE INTO users ${database.get()(user)} RETURNING *`;

    if (!updated) {
        return failure({
            code: 500,
            message: "",
            status: 500,
            title: "Failed to update user in database",
        });
    }

    void cache.set(`users/${id}`, updated);

    const users: Data<User[]> = await find();

    if (isFailure(users)) {
        return users;
    }

    void cache.set("users", users.data);

    return users;
};

export const remove = async (id: string): Promise<Data<DataPayload>> => {
    const [result] = await database.get()`DELETE
                                                FROM users
                                          WHERE users.id = ${id} RETURNING *`;

    if (!result) {
        return failure({
            code: 500,
            message: "",
            status: 500,
            title: "Failed to remove user from database",
        });
    }

    await cache.clear(["users", `users/${id}`]);

    return success({
        code: 200,
        message: "",
        status: 200,
        title: "Failed to remove user from database",
    });
};
