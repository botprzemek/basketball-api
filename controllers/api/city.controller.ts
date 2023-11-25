import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/sendData.util'

export async function cities(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.cities()
  sendData(req, res, data)
}

export async function citiesById(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.citiesById(BigInt(req.params.id))
  sendData(req, res, data)
}

export async function citiesByName(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.citiesByName(req.params.name)
  sendData(req, res, data)
}
