import * as database from "@/services/data/database";
import * as cache from "@/services/data/cache";
import { success } from "@/utils/error";
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

export const findById = async (id: bigint): Promise<User | undefined> => {
    const cached: User[] = await cache.get<User[]>("users");

    if (cached && cached.length > 0) {
        return cached.find((user: User): boolean => user.id === id);
    }

    const [user]: [User?] =
        await database.get()`SELECT * FROM users WHERE users.id = ${id.toString()}`;

    return user;
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

    const cached: User[] = (await cache.get("users")) as User[];

    if (!cached || cached.length === 0) {
        return;
    }

    cached.push(...result);

    await cache.set("users", cached);
};

export const update = async (user: User): Promise<void> => {
    user = filter(user, ["id"]);
    user = {
        ...user,
        password: generate(user.password),
    };

    const result = await database.get()<
        User[]
    >`UPDATE INTO users ${database.get()(user)} RETURNING *`;

    const cached: User[] = (await cache.get("users")) as User[];

    if (!cached || cached.length === 0) {
        return;
    }

    cached.push(...result);

    await cache.set("users", cached);
};

export const remove = async (id: bigint): Promise<void> => {
    const result = await database.get()<User[]>`DELETE
                                                FROM users
                                                WHERE users.id = ${id.toString()} RETURNING *`;

    const cached: User[] = (await cache.get("users")) as User[];

    if (!cached || cached.length === 0) {
        return;
    }

    await cache.set(
        "users",
        cached.filter((user: User): boolean => user.id !== id),
    );
};
