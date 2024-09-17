export const success = <Resource>(data: Resource[]): Data<Resource[]> => ({
    data,
});

export const failure = <Resource>(error: DataError): Data<Resource[]> => ({
    data: [],
    error,
});

export const isFailure = <Resource>(
    result: Data<Resource[]>,
): result is { data: []; error: DataError } => !!result.error;

export const map = <Resource, Transformed>(
    result: Data<Resource[]>,
    method: (data: Resource) => Transformed,
): Data<Resource[] | Transformed[]> =>
    !isFailure(result) ? { data: result.data.map(method) } : result;
