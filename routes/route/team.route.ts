import { Router } from 'express'
import { teams, teamsById, teamsByName } from 'controllers/api/team.controller'
import { playersByTeamId } from 'controllers/api/player.controller'
import { staffByTeamId } from 'controllers/api/staff.controller'

const router: Router = Router()

router.get('/', teams)
router.get('/id/:id', teamsById)
router.get('/id/:id/players', playersByTeamId)
router.get('/id/:id/staff', staffByTeamId)
router.get('/name/:name', teamsByName)

export default router
