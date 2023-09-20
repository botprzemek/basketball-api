import { Request, Response } from 'express'
import { Player } from '@prisma/client'
import storage from 'services/Storage'
import sendData from 'utils/SendData'

export async function players(req: Request, res: Response): Promise<void> {
  const data: Player[] = await storage.players()
  sendData(req, res, data)
}
