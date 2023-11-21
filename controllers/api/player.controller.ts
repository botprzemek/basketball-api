import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/sendData.util'

export async function players(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.players()
  sendData(req, res, data)
}

export async function playersById(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.playersById(BigInt(req.params.id))
  sendData(req, res, data)
}

export async function playersByName(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.playersByName(req.params.name)
  sendData(req, res, data)
}

export async function playersByTeamId(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.playersByTeamId(BigInt(req.params.id))
  sendData(req, res, data)
}
