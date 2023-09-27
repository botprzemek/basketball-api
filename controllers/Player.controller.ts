import { Request, Response } from 'express'
import storage from 'services/Storage'
import sendData from 'utils/Data.util'
import { PlayerFiltered } from 'models/Query.model'

export async function players(req: Request, res: Response): Promise<void> {
  const data: PlayerFiltered[] = await storage.players()
  sendData(req, res, data)
}

export async function playersByName(req: Request, res: Response): Promise<void> {
  const data: PlayerFiltered[] = await storage.playersByName(req.params.name)
  sendData(req, res, data)
}
