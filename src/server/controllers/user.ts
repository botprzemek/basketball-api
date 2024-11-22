import database from "@/stores/database";
import { get, NOT_IMPLEMENTED } from "@/server/data";

export default (key: string) =>
    ({
        find: () =>
            get(
                key,
                () => database.get()<User.Entity[]>`SELECT *
                                                    FROM basketball.users`,
            ),

        findById: (id: User.FindById) =>
            get(
                key,
                () => database.get()<User.Entity[]>`SELECT *
                                                    FROM basketball.users
                                                    WHERE users.id = ${id}`,
            ),

        findByUsername: (username: User.FindByUsername) =>
            get(
                key,
                () => database.get()<User.Entity[]>`SELECT *
                                                    FROM basketball.users
                                                    WHERE users.username = ${username}`,
            ),

        create: async (user: User.Create) => NOT_IMPLEMENTED,

        update: async (user: User.Update) => NOT_IMPLEMENTED,

        remove: async (id: User.Remove) => NOT_IMPLEMENTED,
    }) satisfies User.Controller;
