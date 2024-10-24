import validate from "@/utils/validate";
import send from "@/utils/send";
import { compare, generate } from "@/utils/password";
import { getToken } from "@/config/types/server";
import { failure, success } from "@/utils/error";

import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const users: any[] = [
    {
        username: "test",
        password:
            "dcae124da4a6eb0a090a970ac57e8e55fa58d5da4dc14c7df83b6a1dfbcf0db8fc1c91cb5277b521aa6989d3eff8de07b25d741c31489ce69cbc3245677b27fd.337e28a88dcef50a10e43aa4cd2fc00c",
    },
];

export const login = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { username, password } = request.body;

    if (username !== users.at(0).username) {
        response.sendStatus(701);
        return;
    }

    if (!compare(users.at(0).password, password)) {
        response.sendStatus(702);
        return;
    }

    const data: AuthToken = {
        refresh_token: jwt.sign(
            {
                user: {
                    id: "00000000-0000-0000-0000-000000000004",
                },
            },
            getToken().secret,
            getToken().refreshOptions,
        ),
        access_token: jwt.sign(
            {
                user: {
                    id: "00000000-0000-0000-0000-000000000004",
                },
            },
            getToken().secret,
            getToken().accessOptions,
        ),
    };

    send(success([data]), response);
};

export const register = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { username, password } = request.body;

    response.json({
        username,
        password: generate(password),
    });

    response.status(201).end();
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
