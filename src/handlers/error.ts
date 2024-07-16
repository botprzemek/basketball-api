import { Response } from "express";

class Error {}

// export class BadRequest extends Error {}

export class Unauthorized extends Error {
    // private readonly statusCode: number;
    // private readonly message: string;

    constructor(response: Response) {
        super();

        response.status(401).end();
    }
}

// export class Forbidden extends Error {}

// export class NotFound extends Error {}

// export class Gone extends Error {}

// export class NotImplemented extends Error {}

// export class Internal extends Error {}
