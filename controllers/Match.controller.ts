import {Request, Response} from 'express'
import {MatchFiltered} from 'models/Query.model'
import storage from 'services/Storage'
import sendData from 'utils/SendData'

export async function matches(req: Request, res: Response): Promise<void> {
  const data: MatchFiltered[] = await storage.matches()
  sendData(req, res, data)
}

export async function matchesByDate(req: Request, res: Response): Promise<void> {
  const data: MatchFiltered[] = await storage.matchesByDate(req.params.date)
  sendData(req, res, data)
}
