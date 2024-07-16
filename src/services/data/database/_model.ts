import Resource from "@/models/resource";

class QueryBuilder {}

export default class _model {
    private readonly resource: Resource;

    constructor(resource: Resource) {
        this.resource = resource;
    }

    public static get = async <T>(): Promise<T[]> => {
        console.log([]);
        return [];
    };

    public static create = async <T>(data: T[]): Promise<T[]> => {
        console.log(data);
        return data;
    };

    public static update = async <T>(data: T[]): Promise<T[]> => {
        console.log(data);
        return data;
    };

    public static delete = async <T>(data: T[]): Promise<T[]> => {
        console.log(data);
        return data;
    };
}
