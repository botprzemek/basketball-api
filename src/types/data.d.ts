type DataPayload =
    | Model
    | {
          status: number;
          code: number;
          title: string;
          message: string;
      };

type Data = {
    data: DataPayload;
    error?: DataPayload;
};
