type DataPayload = {
    status: number;
    code: number;
    title: string;
    message: string;
};

type Data = {
    data: Model[] | DataPayload[];
    error?: DataPayload;
};
