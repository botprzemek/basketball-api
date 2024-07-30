import Data from "@/services/data";

export default class Controller {
    private readonly data;

    constructor(data: Data) {
        this.data = data;
    }

    public get = async (): Promise<[]> => {
        return await this.data.get();
    };

    public create = async (data: []): Promise<[]> => {
        return await this.data.get();
    };

    public update = async (data: []): Promise<[]> => {
        return await this.data.get();
    };

    public delete = async (data: []): Promise<[]> => {
        return await this.data.get();
    };
}
