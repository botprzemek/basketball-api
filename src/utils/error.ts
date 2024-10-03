export const success = (data: Model[]): Data<Model[]> => ({
    data,
});

export const failure = (error: DataError): Data<Model[]> => ({
    data: [],
    error,
});

export const isFailure = (
    result: Data<Model[]>,
): result is { data: []; error: DataError } => !!result.error;
