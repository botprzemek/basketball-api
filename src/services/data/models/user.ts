import * as database from "@/services/data/database";
import * as cache from "@/services/data/cache";
import { failure, success } from "@/utils/error";
import { generate } from "@/utils/password";
import filter from "@/utils/filter";

export const find = async (): Promise<Data<User[]>> => {
    const cached: User[] = await cache.get<User[]>("users");

    if (cached && cached.length > 0) {
        return success<User[]>(cached);
    }

    return success<User[]>(
        await database.get()<User[]>`SELECT *
                                     FROM users`,
    );
};

export const findById = async (id: bigint): Promise<Data<User[]>> => {
    const cached: User[] = await cache.get<User[]>("users");

    if (cached && cached.length === 0) {
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

        return success<User[]>([user]);
    }

    const user: User | undefined = cached.find(
        (user: User): boolean => user.id === id,
    );

    if (user) return success<User[]>([user]);
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

    void cache.clear("users");
};

export const update = async (id: bigint, user: User): Promise<void> => {
    if (!id) {
        return;
    }

    const path: string = `users/${id}`;

    user = {
        ...user,
        id: undefined,
        password: generate(user.password),
    };

    const [updated]: [User?] =
        await database.get()`UPDATE INTO users ${database.get()(user)} RETURNING *`;

    if (!updated) {
        return;
    }

    await cache.set(path, updated);
};

export const remove = async (id: bigint): Promise<void> => {
    const path: string = ;
    const [result] = await database.get()`DELETE
                                                FROM users
                                                WHERE users.id = ${id.toString()} RETURNING *`;

    if (!result) {
        return;
    }

    await cache.clear(["users", `users/${id}`]);
};
