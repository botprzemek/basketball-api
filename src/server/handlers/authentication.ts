import { User } from "@/models/resources/user";
import { UnauthorizedError } from "@/server/router/error";
import Config from "@/config/server";

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Data from "@/services/data";

export default class AuthenticationHandler {
    private readonly data: Data;

    constructor(data: Data) {
        this.data = data;
    }

    public login = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        const { email, password } = request.body;

        const [user]: [User?] = await this.data
            .getDatabase()
            .test()`SELECT * FROM basketball.users WHERE basketball.users.email = ${email}`;

        if (!user || user.password !== password) {
            new UnauthorizedError(
                response,
                "Please provide a valid login credentials (Email and password).",
            );

            return;
        }

        const tokens = {
            access: jwt.sign(
                {
                    email,
                },
                new Config().getTokenSecret(),
                {
                    expiresIn: "1m",
                },
            ),
            refresh: jwt.sign(
                {
                    email,
                },
                new Config().getTokenSecret(),
                new Config().getTokenOptions(),
            ),
        };

        response
            .status(200)
            .cookie(
                "access_token",
                tokens.access,
                new Config().getCookieOptions(),
            )
            .cookie(
                "refresh_token",
                tokens.refresh,
                new Config().getCookieOptions(),
            );

        response.end(
            JSON.stringify({
                message: "Logged in successfully.",
            }),
        );
    };

    logout = async (request: Request, response: Response): Promise<void> => {};

    register = async (
        request: Request,
        response: Response,
    ): Promise<void> => {};

    verify = async (request: Request, response: Response): Promise<void> => {};
}
