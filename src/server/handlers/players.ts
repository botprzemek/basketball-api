import player from "@/services/data/models/player";
import validate from "@/utils/validate";
import send from "@/utils/send";
import { failure } from "@/utils/error";

import { Request, Response } from "express";

const ID_NOT_VALID: Data = failure({
    code: 400,
    message: "",
    status: 400,
    title: "Player ID is not valid",
});

const DATA_NOT_VALID: Data = failure({
    code: 400,
    message: "",
    status: 400,
    title: "User Data is not valid",
});

export const get = async (
    request: Request,
    response: Response,
): Promise<void> => {
    send(await player.find(request.user), response);
};

export const getById = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { id } = request.params;

    if (!validate.id(id)) {
        return send(ID_NOT_VALID, response);
    }

    send(await player.findById(request.user, id as UUID), response);
};

export const post = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { data } = request.body;

    if (!validate.data(data)) {
        return send(DATA_NOT_VALID, response);
    }

    send(await player.create(data), response);
};

export const put = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { id } = request.params;

    if (!validate.id(id)) {
        return send(ID_NOT_VALID, response);
    }

    const { data } = request.body;

    if (!validate.data(data)) {
        return send(DATA_NOT_VALID, response);
    }

    send(await player.update(id, data.at(0) as Player), response);
};

export const _delete = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { id } = request.params;

    if (!validate.id(id)) {
        return send(ID_NOT_VALID, response);
    }

    send(await player.remove(id), response);
};
