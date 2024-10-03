import {
    create,
    find,
    findById,
    remove,
    update,
} from "@/services/data/models/user";

export const get = async (): Promise<Data<User[]>> => find();

export const getById = async (id: bigint): Promise<Data<User[]>> => {
    return findById(id);
};

export const post = async (users: User[]): Promise<any> => await create(users);

export const put = async (id: bigint, user: User): Promise<void> =>
    await update(id, user);

export const _delete = async (id: bigint): Promise<void> => await remove(id);
