import database from "@/stores/database";
import { access, wrapper } from "@/utils/data";

const withKey = (key: string): User.Controller => ({
    find: () =>
        access(
            key,
            () => database.get()<User.Entity[]>`SELECT *
                                                FROM basketball.users`,
        ),

    findById: (id: UUID) =>
        access(
            key,
            () => database.get()<User.Entity[]>`SELECT *
                                                FROM basketball.users
                                                WHERE users.id = ${id}`,
        ),

    findByUsername: (username: string) =>
        access(
            key,
            () => database.get()<User.Entity[]>`SELECT *
                                                FROM basketball.users
                                                WHERE users.username = ${username}`,
        ),

    create: (user: User.Entity) =>
        // TODO
        // INSERT with Transaction
        new Promise(() =>
            wrapper({
                status: 501,
                message: "Function not implemented.",
            }),
        ),

    update: (user: User.Entity) =>
        // TODO
        // UPDATE with Transaction
        new Promise(() =>
            wrapper({
                status: 501,
                message: "Function not implemented.",
            }),
        ),

    remove: (id: UUID) =>
        // TODO
        // REMOVE with Transaction
        new Promise(() =>
            wrapper({
                status: 501,
                message: "Function not implemented.",
            }),
        ),
});

export default withKey;
