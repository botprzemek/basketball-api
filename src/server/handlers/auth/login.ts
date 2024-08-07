import Config from "@/config/server";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "@/server/router/error";

export default async (request: Request, response: Response): Promise<void> => {
    const { email, password } = request.body;

    const mockedDatabase = {
        "test@test.com": {
            user_id: 1,
            password: "Test123!",
        },
    };

    if (!email || password !== "Test123!") {
        new UnauthorizedError(
            response,
            "Please provide a valid login credentials (Email and password).",
        );

        return;
    }

    const token: string = jwt.sign(
        {
            email,
        },
        new Config().getTokenKey(),
    );

    const json: string = JSON.stringify({
        token: token,
    });

    response.status(200);

    response.write(json);

    response.end();
};
