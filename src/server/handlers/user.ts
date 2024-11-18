import controller from "@/server/controllers/user";
import { send } from "@/server/handlers";

import { Request, Response } from "express";

export const get = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { find, findByUsername } = controller(request.originalUrl);
    const username = request.query.username;

    // TODO
    // VALIDATION
    // PARAMETER FILTERING

    if (username && typeof username === "string") {
        return send(await findByUsername(username), response);
    }

    send(await find(), response);
};

export const getById = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { findById } = controller(request.originalUrl);
    const id = request.params.id as UUID;

    // TODO
    // VALIDATION

    send(await findById(id), response);
};

export const post = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { create } = controller(request.originalUrl);
    const { user } = request.body;

    // TODO
    // VALIDATION

    send(await create(user), response);
};

export const put = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { update } = controller(request.originalUrl);
    const { user } = request.body;

    // TODO
    // VALIDATION

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

    send(await remove(id), response);
};

export default {
    get,
    getById,
    post,
    put,
    _delete,
};
