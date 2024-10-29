export const success = (data: Payload.Data): Payload => ({
    data,
});

export const failure = (error: Payload.Details): Payload => ({
    data: [],
    error,
});

export const isFailure = (
    result: Payload,
): result is Payload & { error: Payload.Details } => Boolean(result.error);
