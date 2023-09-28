import { type NextFunction, type Request, type Response } from 'express'
import config from 'config'

export default function (req: Request, res: Response, next: NextFunction): void {
  if (req.ip === '::ffff:127.0.0.1' || req.ip === '::1') {
    res.locals.start = performance.now()
    next()
    return
  }
  if (config.useSecret && req.headers.secret !== process.env.SECRET) {
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [server] unauthorized access (${req.ip})`)
    res.sendStatus(401)
    return
  }
  res.locals.start = performance.now()
  next()
}
