import Data from "@/services/data";
import Resource from "@/models/resource";

class QueryBuilder {}

export default class Model {
    private readonly data: Data;
    private readonly resource: Resource;

    constructor(resource: Resource, data: Data) {
        this.data = data;
        this.resource = resource;
    }

    public get = async <T>(): Promise<T[]> => {
        console.log([]);
        return [];
    };

    public create = async <T>(data: T[]): Promise<void> => {
        console.log(data);
    };

    public update = async <T>(data: T[]): Promise<void> => {
        console.log(data);
    };

    public delete = async <T>(data: T[]): Promise<void> => {
        console.log(data);
    };
}
