import { create, find, remove, update } from "@/services/data/models/user";
import { failure } from "@/utils/error";
import { PostgresError } from "postgres";

export const get = async (): Promise<Data<User[]>> => {
    try {
        return find();
    } catch (error) {
        if ((error as PostgresError).code === "ENOTFOUND") {
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

export const getById = async (id: bigint): Promise<Data<User[]>> => {
    return {
        data: [],
    };
};

export const post = async (users: User[]): Promise<any> => await create(users);

export const put = async (users: User[]): Promise<void> => await update(users);

export const _delete = async (ids: bigint[]): Promise<void> =>
    await remove(ids);
