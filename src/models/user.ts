import * as database from "@/services/database";
import { generate } from "@/utils/password";
import * as cache from "@/services/cache";

export type User = {
    id?: number;
    email: string;
    recovery_email?: string;
    password: string;
    refresh_token: string;
    verify_token: string;
    logged_at?: Date;
    created_at: Date;
    updated_at?: Date;
};

export const getOne = (id: number) => {};

export const getAll = async (): Promise<User[]> => await database.get()<User[]>`SELECT * FROM users`;

export const create = async (data: User[]) => {
    data = data.map((user: User): User => ({ ...user, password: generate(user.password) }));

    const cached: User[] = (await cache.get("users")) as User[];

    const result = await database.get()<User[]>`INSERT INTO users ${database.get()(data)} RETURNING *`;

    cached.push(...result);

    await cache.set("users", cached);
};

export const update = (id: number, data: User) => {};

export const remove = (id: number) => {};
