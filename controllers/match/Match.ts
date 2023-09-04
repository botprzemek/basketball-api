import {Request, Response} from 'express'
import {MatchFiltered} from 'services/storage/prisma/QueryType'
import storage from 'services/Storage'

const sendData = (req: Request, res: Response, data: MatchFiltered[]): void => {
    if (!Array.isArray(data) || data.length === 0) {
        console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] requested matches are null`)
        res.sendStatus(404)
        return
    }

    res.send(data)
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [request] GET ${decodeURI(req.baseUrl + req.path)} (${((performance.now() - res.locals.start) / 1000).toFixed(2)}s)`)
}

export const matches = async (req: Request, res: Response): Promise<void> => {
    const data: MatchFiltered[] = await storage.matches()
    sendData(req, res, data)
}

export const matchesByName = async (req: Request, res: Response): Promise<void> => {
    const data: MatchFiltered[] = await storage.matchesByDate(req.params.date)
    sendData(req, res, data)
}