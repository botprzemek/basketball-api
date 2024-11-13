export const wrapper = <Entity>(
    data: Entity[] | Exception,
): Payload<Entity> => {
    if (!Array.isArray(data)) {
        return {
            data: [],
            error: data,
        };
    }

    return {
        data,
    };
};

export default wrapper;
