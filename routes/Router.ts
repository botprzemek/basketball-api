import {Request, Response, Router} from 'express'
import * as cors from 'cors'
import {CorsOptions} from 'cors'
import player from 'routes/route/player/Player'
import team from './route/team/Team'
import match from './route/match/Match'
import web from './route/Web'
import schedule from './route/schedule/Schedule'
import error from '../middlewares/Error'
import secret from '../middlewares/Secret'

const router: Router = Router()

router.use(cors( { origin: JSON.parse(process.env.ADDRESSES) } as CorsOptions))

router.use(error)
router.use(secret)

router.use('/team', team)
router.use('/player', player)
router.use('/match', match)
router.use('/schedule', schedule)
router.use('/web', web)

router.all('*', (req: Request, res: Response) => res.sendStatus(404))

export default router