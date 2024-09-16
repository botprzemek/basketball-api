import { Request, Response } from "express";

export default (request: Request, response: Response): void => {
    response.status(404).end();
};
