type Entity = User.Entity;

type Query = () => Promise<Entity[]>;

type Exception = {
    status: number;
    message: string;
};

type Data = Partial<Entity>[] | Exception;

type Payload = {
    data: Data;
    error?: Exception;
};

type Result = User.Result;
