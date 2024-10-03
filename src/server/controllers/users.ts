import {
    create,
    find,
    findById,
    remove,
    update,
} from "@/services/data/models/user";
import { failure } from "@/utils/error";
import postgres from "postgres";

export const get = async (): Promise<Data<User[]>> => {
    try {
        return find();
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
            message: "",
            status: 500,
            title: "Server error",
        });
    }
};

export const getById = async (id: bigint): Promise<Data<User | undefined>> => {
    return findById(id);
};

export const post = async (users: User[]): Promise<any> => await create(users);

export const put = async (id: bigint, user: User): Promise<void> =>
    await update(id, user);

export const _delete = async (id: bigint): Promise<void> => await remove(id);
