namespace User {
    type Entity = {
        id: UUID;
        identity_id: UUID;
        username: string;
        password: string;
        recovery_email: string;
        refresh_token: string;
        verification_token: string;
        logged_at: Date;
        deleted_at: Date;
        is_deleted: boolean;
    };

    type Result = Payload<Entity> | Promise<Payload<Entity>>;

    type FindById = UUID;

    type FindByUsername = string;

    type Create = Pick<Entity, "username" | "password">;

    type Update = Partial<Entity>;

    type Remove = UUID;

    type Controller = {
        find: () => Result;

        findById: (id: FindById) => Result;

        findByUsername: (username: FindByUsername) => Result;

        create: (user: Create) => Result;

        update: (user: Update) => Result;

        remove: (id: Remove) => Result;
    };
}
