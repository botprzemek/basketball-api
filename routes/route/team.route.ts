import {Router} from 'express'
import {teams, teamsByName} from 'controllers/api/team.controller'
import playersByTeam from './team/player.team'

const router: Router = Router()

router.get('/', teams)
router.get('/:name', teamsByName)

router.use('/:name/players', playersByTeam)

export default router
