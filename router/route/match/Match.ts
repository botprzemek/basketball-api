import {Request, Response, Router} from 'express'
import apiConfig from 'api.config'
import storage from 'storage/Storage'

const router: Router = Router()

router.get('/', async (req: Request, res: Response): Promise<Response> => {
    const data = await storage.matches()

    data.forEach(match => {
        match.score.final = [ match.score.host.reduce((partialSum, a) => partialSum + a, 0), match.score.opponent.reduce((partialSum, a) => partialSum + a, 0) ]
        match.host = match.host.name
        match.opponent = match.opponent.name
    })

    if (!Array.isArray(data) || data.length === 0) {
        console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] requested matches are null`)
        return res.sendStatus(404)
    }

    res.send(data)
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [request] GET ${decodeURI(req.baseUrl + req.path)} - requested matches (${((performance.now() - res.locals.start) / 1000).toFixed(2)}s)`)
})

router.get('/:date', async (req: Request, res: Response): Promise<Response> => {
    if(!req.params.date.match(apiConfig.dateRegex)) return res.sendStatus(404)

    const data = await storage.matchesByDate(req.params.date)

    if (!Array.isArray(data) || data.length === 0) {
        console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] requested matches are null`)
        return res.sendStatus(404)
    }

    res.send(data)
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [request] GET ${decodeURI(req.baseUrl + req.path)} - requested matches (${((performance.now() - res.locals.start) / 1000).toFixed(2)}s)`)
})

export default router