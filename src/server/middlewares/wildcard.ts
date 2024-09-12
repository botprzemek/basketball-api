import { NotFoundError } from "@/server/handlers/error";

import { Request, Response } from "express";

export default (request: Request, response: Response): Error => new NotFoundError(response, request.originalUrl);
