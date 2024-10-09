type DataPayload = {
    status: number;
    code: number;
    title: string;
    message: string;
};

type Data<Resource> = {
    data: Resource | DataPayload;
    error?: DataPayload;
};
