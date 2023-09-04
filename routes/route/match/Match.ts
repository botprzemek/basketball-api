import {Router} from 'express'
import {matches, matchesByName} from 'controllers/match/Match'

const router: Router = Router()

router.get('/', matches)
router.get(`^/:date(202[0-9]-[0,1][0-9]-[0,1,2,3][0-9])`, matchesByName)

export default router