import { failure } from "@/utils/error";

export const TOKEN_NOT_FOUND: Data = failure({
    code: 401,
    message: "Authorization token not found",
    status: 401,
    title: "",
});

export const INVALID_TOKEN: Data = failure({
    code: 401,
    message: "Invalid authorization Token",
    status: 401,
    title: "",
});

export const ID_NOT_VALID: Data = failure({
    code: 400,
    message: "ID is not valid",
    status: 400,
    title: "",
});

export const DATA_NOT_VALID: Data = failure({
    code: 400,
    message: "",
    status: 400,
    title: "Data is not valid",
});

export default {
    authentication: {
        TOKEN_NOT_FOUND,
        INVALID_TOKEN,
    },
    validation: {
        ID_NOT_VALID,
        DATA_NOT_VALID,
    },
};
