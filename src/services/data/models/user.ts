import * as database from "@/services/data/database";
import * as cache from "@/services/data/cache";
import { failure, success } from "@/utils/error";
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

export const findById = async (id: bigint): Promise<Data<User[]>> => {
    const cached: User = await cache.getOne(`users/${id}`);

    if (cached) {
        return success([cached]);
    }

    const [user]: [User?] = await database.get()`SELECT *
                                                     FROM users
                                                     WHERE users.id = ${id.toString()}`;

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

export const update = async (id: bigint, user: User): Promise<void> => {
    if (!id) {
        return;
    }

    const data = {
        ...user,
        id: undefined,
        password: generate(user.password),
    };

    const [updated]: [User?] =
        await database.get()`UPDATE INTO users ${database.get()(data)} RETURNING *`;

    if (!updated) {
        return;
    }

    await cache.set(`users/${id}`, updated);
};

export const remove = async (id: bigint): Promise<void> => {
    const [result] = await database.get()`DELETE
                                                FROM users
                                                WHERE users.id = ${id.toString()} RETURNING *`;

    if (!result) {
        return;
    }

    await cache.clear(["users", `users/${id}`]);
};
