import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/sendData.util'

export async function arenas(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.arenas()
  sendData(req, res, data)
}

export async function arenasById(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.arenasById(BigInt(req.params.id))
  sendData(req, res, data)
}

export async function arenasByCityId(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.arenasByCityId(BigInt(req.params.id))
  sendData(req, res, data)
}
