namespace User {
    type Entity = {
        id: UUID;
        identity_id?: UUID;
        username: string;
        password: string;
        recovery_email?: string;
        refresh_token?: string;
        verification_token?: string;
        logged_at?: Date;
        deleted_at?: Date;
        is_deleted?: boolean;
    };

    type Result = Promise<Payload<Entity>>;

    type Find = () => Result;

    type FindById = (id: UUID) => Result;

    type FindByUsername = (username: string) => Result;

    type Create = (
        username: string,
        password: string,
        recovery_email?: string,
    ) => Result;

    type Update = (user: Entity) => Result;

    type Remove = (id: UUID) => Result;

    type Controller = {
        find: Find;

        findById?: FindById;

        findByUsername?: FindByUsername;

        create?: Create;

        update?: Update;

        remove?: Remove;
    };
}
