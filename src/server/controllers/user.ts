import database from "@/stores/database";
import { access, NOT_IMPLEMENTED } from "@/server/data";

export default (key: string) =>
    ({
        find: () =>
            access(
                key,
                () => database.get()<User.Entity[]>`SELECT *
                                                    FROM basketball.users`,
            ),

        findById: (id: User.FindById) =>
            access(
                key,
                () => database.get()<User.Entity[]>`SELECT *
                                                    FROM basketball.users
                                                    WHERE users.id = ${id}`,
            ),

        findByUsername: (username: User.FindByUsername) =>
            access(
                key,
                () => database.get()<User.Entity[]>`SELECT *
                                                    FROM basketball.users
                                                    WHERE users.username = ${username}`,
            ),

        create: (user: User.Create) => NOT_IMPLEMENTED,

        update: (user: User.Update) => NOT_IMPLEMENTED,

        remove: (id: User.Remove) => NOT_IMPLEMENTED,
    }) satisfies User.Controller;
