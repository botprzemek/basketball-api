export enum Method {
    get = "get",
    post = "post",
    put = "put",
    delete = "delete",
}

export type MethodKey = keyof typeof Method;
