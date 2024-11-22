import controller from "@/server/controllers/user";
import { send, wrap } from "@/server/data";

import { Request, Response } from "express";
import {
    isIdValid,
    isPasswordValid,
    isUsernameValid,
} from "@/server/validation/user";

export const get = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { find, findByUsername } = controller(request.originalUrl);
    const username = request.query.username;

    if (!username) {
        return send(await find(), response);
    }

    if (isUsernameValid(username)) {
        return send(await findByUsername(username), response);
    }

    return send(
        wrap({
            status: 400,
            message:
                "Username field is not valid, please refer to the documentation.",
        }),
        response,
    );
};

export const getById = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { findById } = controller(request.originalUrl);
    const id = request.params.id;

    if (isIdValid(id)) {
        return send(await findById(id), response);
    }

    return send(
        wrap({
            status: 400,
            message:
                "Id field is not valid, please refer to the documentation.",
        }),
        response,
    );
};

export const post = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { create } = controller(request.originalUrl);
    const { username, password } = request.body;

    if (!isUsernameValid(username)) {
        return send(
            wrap({
                status: 400,
                message:
                    "Username field is not valid, please refer to the documentation.",
            }),
            response,
        );
    }

    if (!isPasswordValid(password)) {
        return send(
            wrap({
                status: 400,
                message:
                    "Password field is not valid, please refer to the documentation.",
            }),
            response,
        );
    }

    const user = { username, password } satisfies User.Create;

    return send(await create(user), response);
};

export const put = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { update } = controller(request.originalUrl);
    const { user } = request.body;

    // TODO
    // VALIDATION
    // TYPE GUARD

    send(await update(user), response);
};

export const _delete = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { remove } = controller(request.originalUrl);
    const id = request.params.id as UUID;

    // TODO
    // VALIDATION
    // TYPE GUARD

    send(await remove(id), response);
};

export default {
    get,
    getById,
    post,
    put,
    _delete,
};
