interface Payload<Model> {
    data: Model[] | Exception[];
    error?: Exception;
}
