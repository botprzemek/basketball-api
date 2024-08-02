import Data from "@/services/data";

export default class Controller {
    private readonly dataReference: Data;

    constructor(dataReference: Data) {
        this.dataReference = dataReference;
    }

    public get = async (): Promise<any[]> => {
        return this.dataReference.get();
    };

    public create = async (data: Object): Promise<any[]> => {
        return this.dataReference.get();
    };

    public update = async (data: Object): Promise<any[]> => {
        return this.dataReference.get();
    };

    public remove = async (data: Object): Promise<any[]> => {
        return this.dataReference.get();
    };
}
