import { NextFunction, Request, Response } from 'express'
import config from 'Config'

export default function (req: Request, res: Response, next: NextFunction): Response {
  if (config.useSecret && req.headers['secret'] !== process.env.SECRET) {
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [server] unauthorized access (${req.ip})`)
    return res.sendStatus(401)
  }
  res.locals.start = performance.now()
  next()
}
