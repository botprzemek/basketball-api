import send from "@/utils/send";
import { compare } from "@/utils/password";
import { isFailure, success } from "@/utils/error";

import { Request, Response } from "express";
import user from "@/services/data/models/user";
import validate from "@/utils/validate";
import { INVALID_DATA } from "@/server/errors";

export const login = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { data } = request.body;

    if (!validate.data<User>(data)) {
        return send(INVALID_DATA("auth"), response);
    }

    const result = (await user.findByUsername(data.username)).data.at(0);

    if (!result) {
        response.sendStatus(701);
        return;
    }

    if (!compare(result.password, data.password)) {
        response.sendStatus(702);
        return;
    }

    return send(
        success([
            {
                refresh_token: "generated_refresh_token",
                access_token: "generated_access_token",
            },
        ]),
        response,
    );
};

export const register = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { data } = request.body;

    if (!validate.data(data)) {
        return send(INVALID_DATA("auth"), response);
    }

    const result: Payload = await user.create(data);

    if (isFailure(result)) {
        return send(result, response);
    }

    return send(
        success([
            {
                code: 200,
                message: "User created successfully",
                status: 200,
                title: "",
            },
        ]),
        response,
    );
};

export const refresh = async (
    request: Request,
    response: Response,
): Promise<void> => {
    response.status(200).end();
};

export const logout = async (
    request: Request,
    response: Response,
): Promise<void> => {
    response.status(200).end();
};

export default {
    login,
    register,
    refresh,
    logout,
};
