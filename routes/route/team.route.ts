import { Router } from 'express'
import player from './team/player.team'
import { teams, teamsByName } from 'controllers/team.controller'

const router: Router = Router()

router.get('/', teams)
router.get('/:name', teamsByName)

router.use('/:name', player)

export default router
