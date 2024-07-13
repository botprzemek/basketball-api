import data from "@/services/data";
import Model from "@/server/model";

export default class Controller {
    private readonly model: Model;

    constructor(model: Model) {
        this.model = model;
    }

    private resolve = () => {
        const dataService = data();
        return dataService[this.model as keyof typeof dataService];
    };

    public get = async <T>(): Promise<Array<T>> =>
        await this.resolve().get();

    public create = async <T>() =>
        await this.resolve().create();

    public update = async <T>() =>
        await this.resolve().update();

    public remove = async <T>() =>
        await this.resolve().remove();
}
