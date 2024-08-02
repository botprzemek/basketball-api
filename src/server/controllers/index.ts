import Data from "@/services/data";

export default class Controller {
    private readonly data: Data;

    constructor(data: Data) {
        this.data = data;
    }

    public get = async (): Promise<any[]> => {
        return this.data.get();
    };

    public create = async (data: Object): Promise<any[]> => {
        return this.data.get();
    };

    public update = async (data: Object): Promise<any[]> => {
        return this.data.get();
    };

    public remove = async (data: Object): Promise<any[]> => {
        return this.data.get();
    };
}
