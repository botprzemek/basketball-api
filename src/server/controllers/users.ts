import { create, find, remove, update } from "@/services/data/models/user";
import { failure } from "@/utils/error";
import postgres from "postgres";

export const get = async (): Promise<Data<User[]>> => {
    try {
        return await find();
    } catch (error) {
        console.log(error);

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

export const getById = async (id: bigint): Promise<Data<User[]>> => {
    return {
        data: [],
    };
};

export const post = async (users: User[]): Promise<any> => await create(users);

export const put = async (users: User[]): Promise<void> => await update(users);

export const _delete = async (id: bigint): Promise<void> => await remove(id);
