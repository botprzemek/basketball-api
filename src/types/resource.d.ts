declare namespace Resource {
    type Type = "auth" | "users";

    type Return = Promise<Payload>;

    type Find = () => Return;
    type FindById = (id: UUID) => Return;
    type Create = (data: any) => Return;
    type Update = (id: UUID, data: any) => Return;
    type Remove = (id: UUID) => Return;
}

type Resource = {
    name: Resource.Type;
    find: Resource.Find;
    findById: Resource.FindById;
    create: Resource.Create;
    update: Resource.Update;
    remove: Resource.Remove;
};
