import {Router} from 'express'
import {players, playersById, playersByName} from 'controllers/api/player.controller'

const router: Router = Router()

router.get('/', players)
router.get('/id/:id', playersById)
router.get('/name/:name', playersByName)

export default router