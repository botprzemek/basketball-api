import { Router } from 'express'
import player from 'routes/route/player.route'
import team from './route/team.route'
import match from './route/match.route'
import error from '../middlewares/error.middleware'
import secret from '../middlewares/secret.middleware'

const router: Router = Router()

router.use(error)
router.use(secret)

router.use('/teams', team)
router.use('/players', player)
router.use('/matches', match)

export default router
