import user from "@/services/data/models/user";
import validate from "@/utils/validate";
import send from "@/utils/send";
import { failure } from "@/utils/error";

import { Request, Response } from "express";

export const get = async (
    _request: Request,
    response: Response,
): Promise<void> => {
    send(await user.find(), response);
};

export const getById = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { id } = request.params;

    if (!validate.id(id)) {
        const error: Data = failure({
            code: 400,
            message: "",
            status: 400,
            title: "User ID is not valid",
        });

        send(error, response);

        return;
    }

    send(await user.find(id), response);
};

export const post = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { data } = request.body;

    if (!validate.data(data)) {
        const error: Data = failure({
            code: 400,
            message: "",
            status: 400,
            title: "User Data is not valid",
        });

        send(error, response);

        return;
    }

    send(await user.create(data as User[]), response);
};

export const put = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { id } = request.params;

    if (!validate.id(id)) {
        const error: Data = failure({
            code: 400,
            message: "",
            status: 400,
            title: "User ID is not valid",
        });

        send(error, response);

        return;
    }

    const { data } = request.body;

    if (!validate.data(data)) {
        const error: Data = failure({
            code: 400,
            message: "",
            status: 400,
            title: "User Data is not valid",
        });

        send(error, response);

        return;
    }

    send(await user.update(id, data.at(0) as User), response);
};

export const _delete = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { id } = request.params;

    if (!validate.id(id)) {
        const error: Data = failure({
            code: 400,
            message: "",
            status: 400,
            title: "User ID is not valid",
        });

        send(error, response);

        return;
    }

    send(await user.remove(id), response);
};
