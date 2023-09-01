import {ErrorRequestHandler, NextFunction, Request, Response, Router} from 'express'
import * as cors from 'cors'
import {CorsOptions} from 'cors'
import apiConfig from 'api.config'
import player from 'router/route/player/Player'
import team from './route/team/Team'
import match from './route/match/Match'
import web from './route/Web'
import schedule from './route/schedule/Schedule'

const router: Router = Router()

router.use(cors( { origin: JSON.parse(process.env.ADDRESSES) } as CorsOptions))

router.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    if (err) return res.status(404)
    next()
})

router.use((req: Request, res: Response, next: NextFunction) => {
    if (apiConfig.useSecret && req.headers['secret'] !== process.env.SECRET) {
        console.log(`${new Date().toLocaleTimeString('pl-PL')} [server] unauthorized access (${req.ip})`)
        return res.sendStatus(401)
    }
    res.locals.start = performance.now()
    next()
})
router.use('/team', team)
router.use('/player', player)
router.use('/match', match)
router.use('/schedule', schedule)
router.use('/web', web)

router.all('*', (req: Request, res: Response) => res.sendStatus(404))

export default router