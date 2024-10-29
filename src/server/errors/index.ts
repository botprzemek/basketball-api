import { failure } from "@/utils/error";

export const INVALID_ID = (resource: Resource.Type) =>
    failure({
        code: 400,
        message: `Invalid ${resource} ID`,
        status: 400,
        title: "",
    });

export const INVALID_DATA = (resource: Resource.Type) =>
    failure({
        code: 400,
        message: "",
        status: 400,
        title: `Invalid ${resource} data`,
    });

export default {
    INVALID_ID,
    INVALID_DATA,
};
