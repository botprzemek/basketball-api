type Excluded<Resource, Omitted> = Omit<Resource, Omitted>;

type Payload<Resource, Omitted> = {
    data: Excluded<Resource, Omitted>[];
    error?: Error;
};
