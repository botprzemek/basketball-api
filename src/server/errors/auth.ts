import { failure } from "@/utils/error";

export const TOKEN_NOT_FOUND = () =>
    failure({
        code: 401,
        message: "Authorization token not found",
        status: 401,
        title: "",
    });

export const INVALID_TOKEN = () =>
    failure({
        code: 401,
        message: "Invalid authorization token",
        status: 401,
        title: "",
    });

export default {
    TOKEN_NOT_FOUND,
    INVALID_TOKEN,
};
