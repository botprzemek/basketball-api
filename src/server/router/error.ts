interface ErrorPayload {
    code: number;
    message: string;
}

export class HttpError extends Error {
    private readonly payload: ErrorPayload;

    constructor(payload: ErrorPayload) {
        super();

        this.payload = payload;
    }

    public getPayload = (): ErrorPayload => {
        return this.payload;
    };
}

// export class BadRequest extends Error {}

export class Unauthorized extends HttpError {
    constructor(description: string) {
        const payload: ErrorPayload = {
            code: 401,
            message: `Unauthorized - ${description}`,
        };

        super(payload);
    }
}

// export class Forbidden extends Error {}

// export class NotFound extends Error {}

export class NoContent extends HttpError {
    constructor(description: string) {
        const payload: ErrorPayload = {
            code: 204,
            message: `No content - ${description}`,
        };

        super(payload);
    }
}

// export class Gone extends Error {}

// export class NotImplemented extends Error {}

// export class Internal extends Error {}
