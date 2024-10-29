import send from "@/utils/send";

import { Request, Response } from "express";
import validate from "@/utils/validate";
import { INVALID_ID, INVALID_DATA } from "@/server/errors";

export const get =
    (_resource: Resource.Type, controller: Resource.Find) =>
    async (_request: Request, response: Response): Promise<void> => {
        send(await controller(), response);
    };

export const getById =
    (resource: Resource.Type, controller: Resource.FindById) =>
    async (request: Request, response: Response): Promise<void> => {
        const { id } = request.params;

        if (!validate.id(id)) {
            return send(INVALID_ID(resource), response);
        }

        send(await controller(id as UUID), response);
    };

export const post =
    (resource: Resource.Type, controller: Resource.Create) =>
    async (request: Request, response: Response): Promise<void> => {
        const { data } = request.body;

        if (!validate.data(data)) {
            return send(INVALID_DATA(resource), response);
        }

        send(await controller(data), response);
    };

export const put =
    (resource: Resource.Type, controller: Resource.Update) =>
    async (request: Request, response: Response): Promise<void> => {
        const { id } = request.params;

        if (!validate.id(id)) {
            return send(INVALID_ID(resource), response);
        }

        const { data } = request.body;

        if (!validate.data(data)) {
            return send(INVALID_DATA(resource), response);
        }

        send(await controller(id as UUID, data as Model), response);
    };

export const _delete =
    (resource: Resource.Type, controller: Resource.Remove) =>
    async (request: Request, response: Response): Promise<void> => {
        const { id } = request.params;

        if (!validate.id(id)) {
            return send(INVALID_ID(resource), response);
        }

        send(await controller(id as UUID), response);
    };
