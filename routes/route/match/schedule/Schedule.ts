import {Request, Response, Router, RouterOptions} from 'express'
import {Schedule} from '@prisma/client'
import storage from 'services/Storage'

const router: Router = Router({mergeParams: true} as RouterOptions)

router.get('/', async (req: Request, res: Response): Promise<Response> => {
    const data: Schedule[] = await storage.m(req.params.date)

    if (!Array.isArray(data) || data.length === 0) {
        console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] requested schedules are null`)
        return res.sendStatus(400)
    }

    res.send(data)
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [request] GET ${decodeURI(req.baseUrl + req.path)} - requested schedules (${((performance.now() - res.locals.start) / 1000).toFixed(2)}s)`)
})

export default router