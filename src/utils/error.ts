export const success = (
    data: Model[] | DataPayload,
): Data<Model[] | DataPayload> => ({
    data,
});

export const failure = (error: DataPayload): Data<Model[]> => ({
    data: [],
    error,
});

export const isFailure = (
    result: Data<Model[]>,
): result is { data: []; error: DataPayload } => !!result.error;
