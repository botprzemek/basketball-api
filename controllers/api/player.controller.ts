import {type Request, type Response} from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/sendData.util'
import {type PlayerFiltered} from 'models/query/data.model'

export async function players(req: Request, res: Response): Promise<void> {
  const data: PlayerFiltered[] = await storage.players()
  sendData(req, res, data)
}

export async function playersByName(req: Request, res: Response): Promise<void> {
  const data: PlayerFiltered[] = await storage.playersByName(req.params.name)
  sendData(req, res, data)
}

export async function playersByTeam(req: Request, res: Response): Promise<void> {
  const data: PlayerFiltered[] = await storage.playersByTeam(req.params.name)
  sendData(req, res, data)
}
