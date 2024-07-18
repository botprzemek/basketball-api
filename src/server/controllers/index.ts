import Data from "@/services/data";
import Resource from "@/models/resource";

export default class Controller {
    private readonly resource: Resource;
    private readonly data;

    constructor(resource: Resource, data: Data) {
        this.resource = resource;
        this.data = data;
    }

    public get = async <T>(): Promise<T[]> => {
        return await this.data.get<T>(this.resource);
    };

    public create = async <T>(data: T[]): Promise<T[]> => {
        return await this.data.get<T>(this.resource);
    };

    public update = async <T>(data: T[]): Promise<T[]> => {
        return await this.data.get<T>(this.resource);
    };

    public delete = async <T>(data: T[]): Promise<T[]> => {
        return await this.data.get<T>(this.resource);
    };

    public getResource = (): Resource => {
        return this.resource;
    };
}
