import {
    find,
    findById,
    create,
    update,
    remove,
} from "@/services/data/models/user";
import filter from "@/utils/filter";
import wrapper from "@/utils/wrapper";

export const get = async (): Promise<Payload<User[], "password">> =>
    wrapper<"password">(
        (await find()).map((user: User) =>
            filter<User, "password">(user, ["password"]),
        ),
    );

// TODO: Return type

export const getById = async (id: bigint): Promise<any> => {
    const user = await findById(id);

    if (!user) {
        return wrapper<"password">([]);
    }

    return wrapper<"password">(
        [user].map((user: User) =>
            filter<User, "password">(user, ["password"]),
        ),
    );
};

export const post = async (users: User[]): Promise<any> => await create(users);

export const put = async (users: User[]): Promise<void> => await update(users);

export const _delete = async (id: bigint): Promise<void> => await remove(id);
