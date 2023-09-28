import { type ErrorRequestHandler, type NextFunction, type Request, type Response } from 'express'

export default function (_err: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction): void {
  res.status(404)
}
