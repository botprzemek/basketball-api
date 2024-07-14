import Model from "@/services/data/database/model";
import Resource from "@/server/resource";

export default class Controller {
    private readonly model: Model;

    constructor(resource: Resource) {
        this.model = new Model(resource);
    }

    public get = async <T>(): Promise<T[]> => {
        return await this.model.get<T>();
    };

    public create = async <T>(data: T[]): Promise<void> => {
        return await this.model.create<T>(data);
    };

    public update = async <T>(data: T[]): Promise<void> => {
        return await this.model.update<T>(data);
    };

    public delete = async <T>(data: T[]): Promise<void> => {
        return await this.model.delete<T>(data);
    };
}
