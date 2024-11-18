import database from "@/stores/database";
import { access, wrapper } from "@/utils/data";

const controller = (key: string) =>
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

        create: (user: User.Create) => {
            // TODO
            // INSERT with Transaction
            return new Promise(() =>
                wrapper({
                    status: 501,
                    message: "Function not implemented.",
                }),
            );
        },

        update: (user: User.Update) =>
            // TODO
            // UPDATE with Transaction
            new Promise(() =>
                wrapper({
                    status: 501,
                    message: "Function not implemented",
                ),
            ),

        remove: (id: User.Remove) =>
            // TODO
            // REMOVE with Transaction
            new Promise(() =>
                wrapper({
                    status: 501,
                    message: "Function not implemented."
                })
            )
    }) satisfies User.Controller;

export default controller;
