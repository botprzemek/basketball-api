import send from "@/utils/send";

import { Request, Response } from "express";
import validate from "@/utils/validate";
import { ID_NOT_VALID } from "@/server/errors";

// TODO

export const get =
    (controller: Function) =>
    async (_request: Request, response: Response): Promise<void> => {
        send(await controller(), response);
    };

export const getById =
    (controller: Function) =>
    async (request: Request, response: Response): Promise<void> => {
        const { id } = request.params;

        if (!validate.id(id)) {
            return send(ID_NOT_VALID, response);
        }

        send(await controller(), response);
    };

export const post =
    (controller: Function) =>
    async (request: Request, response: Response): Promise<void> => {};

export const put =
    (controller: Function) =>
    async (request: Request, response: Response): Promise<void> => {};

export const _delete =
    (controller: Function) =>
    async (request: Request, response: Response): Promise<void> => {};
