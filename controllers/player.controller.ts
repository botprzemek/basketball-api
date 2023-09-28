import { Request, Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/reponse.util'
import { PlayerFiltered } from 'models/query.model'

export async function players(req: Request, res: Response): Promise<void> {
  const data: PlayerFiltered[] = await storage.players()
  sendData(req, res, data)
}

export async function playersByName(req: Request, res: Response): Promise<void> {
  const data: PlayerFiltered[] = await storage.playersByName(req.params.name)
  sendData(req, res, data)
}
