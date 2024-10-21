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

export default {
    TOKEN_NOT_FOUND,
    INVALID_TOKEN,
};
