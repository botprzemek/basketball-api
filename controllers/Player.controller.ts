import { Request, Response } from 'express'
import storage from 'services/Storage'
import sendData from 'utils/SendData'
import { PlayerSelect } from 'models/Query.model'

export async function players(req: Request, res: Response): Promise<void> {
  const data: PlayerSelect[] = await storage.players()
  sendData(req, res, data)
}
