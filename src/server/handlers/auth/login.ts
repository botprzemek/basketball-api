import Config from "@/config/server";
import Database from "@/services/data/database";
import { UnauthorizedError } from "@/server/router/error";

import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "@/models/resources/user";

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
            new Config().getTokenKey(),
            new Config().getTokenOptions(),
        ),
        refresh: jwt.sign(
            {
                email,
            },
            new Config().getTokenKey(),
            new Config().getTokenOptions(),
        ),
    };

    const json: string = JSON.stringify(tokens);

    response.status(200);

    response.write(json);

    response.end();
};
