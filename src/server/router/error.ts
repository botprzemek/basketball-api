import { Response } from "express";

export class HttpError extends Error {
    private readonly payload: ErrorPayload;

    constructor(response: Response, payload: ErrorPayload) {
        super();

        this.payload = payload;

        response.status(payload.code);

        if (this.hasMessage()) {
            const json: string = JSON.stringify({ error: this.payload });

            response.write(json);
        }

        response.end();
    }

    private hasMessage = (): boolean => {
        return !!this.payload.message;
    };
}

export class BadRequestError extends HttpError {
    constructor(response: Response, description: string) {
        const payload: ErrorPayload = {
            code: 400,
        };

        super(response, payload);
    }
}

export class ForbiddenError extends HttpError {
    constructor(response: Response, description: string) {
        const payload: ErrorPayload = {
            code: 403,
        };

        super(response, payload);
    }
}

export class GoneError extends HttpError {
    constructor(response: Response, description: string) {
        const payload: ErrorPayload = {
            code: 410,
        };

        super(response, payload);
    }
}

export class NoContentError extends HttpError {
    constructor(response: Response) {
        const payload: ErrorPayload = {
            code: 204,
        };

        super(response, payload);
    }
}

export class NotFoundError extends HttpError {
    constructor(response: Response, description: string) {
        const payload: ErrorPayload = {
            code: 404,
            message: `Not found - ${description}`,
        };

        super(response, payload);
    }
}

export class NotImplementedError extends HttpError {
    constructor(response: Response, description: string) {
        const payload: ErrorPayload = {
            code: 204,
        };

        super(response, payload);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(response: Response, description: string) {
        const payload: ErrorPayload = {
            code: 401,
            message: `Unauthorized - ${description}`,
        };

        super(response, payload);
    }
}

export class ConflictError extends HttpError {
    constructor(response: Response, description: string) {
        const payload: ErrorPayload = {
            code: 409,
            message: `Conflict error - ${description}`,
        };

        super(response, payload);
    }
}

export class InternalError extends HttpError {
    constructor(response: Response, description: string) {
        const payload: ErrorPayload = {
            code: 500,
            message: `Internal error - ${description}`,
        };

        super(response, payload);
    }
}
