import { Router } from 'express'
import player from './team/Player.team.route'
import { teams, teamsByName } from 'controllers/Team.controller'

const router: Router = Router()

router.get('/', teams)
router.get('/:team', teamsByName)

router.use('/:team', player)

export default router
