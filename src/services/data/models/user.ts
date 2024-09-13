import * as database from "@/services/data/database";
import * as cache from "@/services/data/cache";
import { generate } from "@/utils/password";
import filter from "@/utils/filter";

export const find = async (): Promise<User[]> => {
    const cached: User[] = await cache.get<User[]>("users");

    if (cached && cached.length > 0) {
        return cached;
    }

    return database.get()<User[]>`SELECT *FROM users`;
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

// TODO Update handler

export const update = async (users: User[]): Promise<void> => {
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

// TODO Remove handler

export const remove = async (id: bigint): Promise<void> => {
    const result = await database.get()<
        User[]
    >`DELETE FROM users WHERE users.id = ${id.toString()}`;

    const cached: User[] = (await cache.get("users")) as User[];

    if (!cached || cached.length === 0) {
        return;
    }

    await cache.set(
        "users",
        cached.filter((user: User): boolean => user.id !== id),
    );
};
