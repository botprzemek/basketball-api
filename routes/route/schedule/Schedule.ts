import {Request, Response, Router} from 'express'
import storage from 'services/Storage'

const router: Router = Router()

router.get('/', async (req: Request, res: Response): Promise<Response> => {
    const data = await storage.schedules()

    console.table(data)

    data.map(schedule => {
        schedule.host = schedule.match.host.name
        schedule.opponent = schedule.match.opponent.name
        delete schedule.match
    })

    if (!Array.isArray(data) || data.length === 0) {
        console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] requested schedules are null`)
        return res.sendStatus(404)
    }

    res.send(data)
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [request] GET ${decodeURI(req.baseUrl + req.path)} - requested schedules (${((performance.now() - res.locals.start) / 1000).toFixed(2)}s)`)
})

export default router