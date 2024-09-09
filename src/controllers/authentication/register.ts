import { Request, Response } from "express";
import Password from "@/models/password";
import { User } from "@/models/resources/user";

public register = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { email, password } = request.body;

    if (!email || !password) {
        new UnauthorizedError(
            response,
            "Please provide a valid register credentials (E-mail and password).",
        );
        return;
    }

    const sql = this.data.getDatabase().test();

    const data = {
        email,
        password: Password.hash(password),
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