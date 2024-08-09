import Config from "@/config/server";
import Database from "@/services/data/database";
import { UnauthorizedError } from "@/server/router/error";
import { User } from "@/models/resources/user";

import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export default async (request: Request, response: Response): Promise<void> => {
    const { email, password } = request.body;

    const database = new Database().test();

    const [user]: [User?] =
        await database`SELECT * FROM basketball.users WHERE basketball.users.email = ${email}`;

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
        .status(302)
        .cookie("access_token", tokens.access, new Config().getCookieOptions())
        .cookie(
            "refresh_token",
            tokens.refresh,
            new Config().getCookieOptions(),
        );

    response.write(
        JSON.stringify({
            message: "Log in successfully",
        }),
    );

    response.end();
};
