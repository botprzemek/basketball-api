import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

export default function (_err: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction) {
  res.status(404)
}
