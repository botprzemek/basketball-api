export default <Omitted>(data: any[]): Payload<User[], Omitted> => {
    if (data.length === 0) {
        return {
            data: [],
            error: new Error(),
        };
    }

    return { data };
};
