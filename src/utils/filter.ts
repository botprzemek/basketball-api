const removeFields =
    <Resource extends Object, Key extends keyof Resource>(
        data: Resource,
        excluded: Key[],
    ) =>
    (accumulator: Excluded<Resource, Key>, key: string) => {
        if (!excluded.includes(key as Key)) {
            accumulator[key as keyof Excluded<Resource, Key>] =
                data[key as keyof Excluded<Resource, Key>];
        }
        return accumulator;
    };

export default <Resource extends Object, Key extends keyof Resource>(
    data: Resource,
    excluded: Key[],
): Excluded<Resource, Key> => {
    return Object.keys(data).reduce(
        removeFields(data, excluded),
        {} as Excluded<Resource, Key>,
    );
};
