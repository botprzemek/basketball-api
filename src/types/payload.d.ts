type Entity = User.Entity;

type Exception = {
    status: number;
    message: string;
};

type Payload = {
    data: Array<Entity | Exception>;
    error?: Exception;
};

type Result = User.Result;
