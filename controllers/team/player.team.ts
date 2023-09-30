import { Request, Response } from 'express'
import { PlayerFiltered } from 'models/data.model'
import storage from 'services/storage.service'
import sendData from 'utils/send.util'

export async function playersByTeam(req: Request, res: Response): Promise<void> {
  const data: PlayerFiltered[] = await storage.playersByTeam(req.params.name)
  sendData(req, res, data)
}
