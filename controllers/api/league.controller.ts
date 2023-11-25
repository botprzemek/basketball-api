import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/sendData.util'

export async function leagues(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.leagues()
  sendData(req, res, data)
}

export async function leaguesById(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.leaguesById(BigInt(req.params.id))
  sendData(req, res, data)
}
