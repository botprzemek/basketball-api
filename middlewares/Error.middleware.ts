import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

export default function (err: ErrorRequestHandler, _req: Request, res: Response, next: NextFunction): Response {
  if (err) return res.status(404)
  next()
}
