import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/sendData.util'

export async function teams(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.teams()
  sendData(req, res, data)
}

export async function teamsById(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.teamsById(BigInt(req.params.id))
  sendData(req, res, data)
}

export async function teamsByName(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.teamsByName(req.params.name)
  sendData(req, res, data)
}
