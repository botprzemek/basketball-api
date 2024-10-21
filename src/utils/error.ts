export const success = (data: Model[] | DataPayload[]): Data => ({
    data,
});

export const failure = (error: DataPayload): Data => ({
    data: [],
    error,
});

export const isFailure = (
    result: Data,
): result is { data: []; error: DataPayload } => !!result.error;
