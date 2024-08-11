import { User } from "@/models/resources/user";
import { ConflictError, UnauthorizedError } from "@/server/router/error";
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

        const sql = this.data.getDatabase().test();

        const [user]: [User?] =
            await sql`SELECT * FROM basketball.users WHERE basketball.users.email = ${email}`;

        if (!user || user.password !== password) {
            new UnauthorizedError(
                response,
                "Please provide a valid login credentials (E-mail and password).",
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
            )
            .end(
                JSON.stringify({
                    message: "Logged in successfully.",
                }),
            );
    };

    public logout = async (
        request: Request,
        response: Response,
    ): Promise<void> => {};

    public register = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        const { email, password } = request.body;

        const sql = this.data.getDatabase().test();

        const [user]: User[] =
            await sql`INSERT INTO basketball.users ${sql({ email, password })} ON CONFLICT (email) DO NOTHING RETURNING *`;

        if (!user) {
            new ConflictError(response, "This e-mail are already used.");

            return;
        }

        response.status(200).end(
            JSON.stringify({
                message: "Registered successfully.",
            }),
        );
    };

    public verify = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        const header: string | undefined = request.headers.authorization;

        if (!header) {
            new UnauthorizedError(
                response,
                "Please provide a valid authorization token.",
            );

            return;
        }

        const token = header.split(" ")[1];

        if (!token) {
            new UnauthorizedError(
                response,
                "Please provide a valid refresh token.",
            );

            return;
        }

        jwt.verify(
            token,
            new Config().getTokenSecret(),
            new Config().getTokenOptions(),
            (error, decoded) => {
                if (error || !decoded) {
                    new UnauthorizedError(
                        response,
                        "Please provide a valid refresh token.",
                    );

                    return;
                }

                // TODO Decoding of Authorization

                const tokens = {
                    access: jwt.sign(
                        {
                            email: decoded.email,
                        },
                        new Config().getTokenSecret(),
                        {
                            expiresIn: "1m",
                        },
                    ),
                };

                response
                    .status(200)
                    .cookie(
                        "access_token",
                        tokens.access,
                        new Config().getCookieOptions(),
                    )
                    .end(
                        JSON.stringify({
                            message: "Signed new access token successfully.",
                        }),
                    );
            },
        );
    };
}
