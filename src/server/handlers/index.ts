import send from "@/utils/send";

import { Request, Response } from "express";
import validate from "@/utils/validate";
import { DATA_NOT_VALID, ID_NOT_VALID } from "@/server/errors";

export const get =
    (controller: () => Promise<Data>) =>
    async (_request: Request, response: Response): Promise<void> => {
        send(await controller(), response);
    };

export const getById =
    (controller: (id: UUID) => Promise<Data>) =>
    async (request: Request, response: Response): Promise<void> => {
        const { id } = request.params;

        if (!validate.id(id)) {
            return send(ID_NOT_VALID, response);
        }

        send(await controller(id as UUID), response);
    };

export const post =
    (controller: (data: Model) => Promise<Data>) =>
    async (request: Request, response: Response): Promise<void> => {
        const { data } = request.body;

        if (!validate.data(data)) {
            return send(DATA_NOT_VALID, response);
        }

        send(await controller(data), response);
    };

export const put =
    (controller: (id: UUID, data: Model) => Promise<Data>) =>
    async (request: Request, response: Response): Promise<void> => {
        const { id } = request.params;

        if (!validate.id(id)) {
            return send(ID_NOT_VALID, response);
        }

        const { data } = request.body;

        if (!validate.data(data)) {
            return send(DATA_NOT_VALID, response);
        }

        send(await controller(id as UUID, data as Model), response);
    };

export const _delete =
    (controller: (id: UUID) => Promise<Data>) =>
    async (request: Request, response: Response): Promise<void> => {
        const { id } = request.params;

        if (!validate.id(id)) {
            return send(ID_NOT_VALID, response);
        }

        send(await controller(id as UUID), response);
    };
