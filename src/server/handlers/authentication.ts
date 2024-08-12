import { User } from "@/models/resources/user";
import { ConflictError, UnauthorizedError } from "@/server/router/error";
import Config from "@/config/server";

import { hash } from "node:crypto";

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

        if (!user || unhashuser.password !== password) {
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

    public register = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        const { email, password } = request.body;

        const sql = this.data.getDatabase().test();

        const data = {
            email,
            password: hash("SHA-512", password),
        };

        const [user]: User[] =
            await sql`INSERT INTO basketball.users ${sql(data)} ON CONFLICT (email) DO NOTHING RETURNING *`;

        if (!user) {
            new ConflictError(response, "These credentials are already used.");
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
        const cookies = request.cookies;

        if (!cookies) {
            new UnauthorizedError(
                response,
                "Please provide a valid authorization token.",
            );
            return;
        }

        const refreshToken: string | undefined = cookies.refresh_token;

        if (!refreshToken) {
            new UnauthorizedError(
                response,
                "Please provide a valid refresh token.",
            );
            return;
        }

        let payload: JwtPayload | undefined;

        try {
            payload = jwt.verify(
                refreshToken,
                new Config().getTokenSecret(),
                new Config().getTokenOptions(),
            ) as JwtPayload;
        } catch (error) {
            new UnauthorizedError(
                response,
                "Please provide a valid refresh token.",
            );
            return;
        }

        if (!payload || !payload.email) {
            new UnauthorizedError(
                response,
                "Please provide a valid refresh token.",
            );
            return;
        }

        const accessToken: string = jwt.sign(
            {
                email: payload.email,
            },
            new Config().getTokenSecret(),
            {
                expiresIn: "1m",
            },
        );

        response
            .status(200)
            .cookie(
                "access_token",
                accessToken,
                new Config().getCookieOptions(),
            )
            .end(
                JSON.stringify({
                    message: "Signed new access token successfully.",
                }),
            );
    };
}
