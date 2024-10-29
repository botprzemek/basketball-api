declare namespace Payload {
    type Details = {
        status: number;
        code: number;
        title: string;
        message: string;
    };

    type Data = Model[] | Details[];
}

type Payload = {
    data: Payload.Data;
    error?: Payload.Details;
};
