import { Request, Response } from 'express'
import sendData from 'utils/sendData.util'
import storage from 'services/storage.service'

export async function schedulesByDate(req: Request, res: Response): Promise<void> {
  const data: any = await storage.schedulesByDate(req.params.date)
  sendData(req, res, data)
}

export async function schedulesAfterDate(req: Request, res: Response): Promise<void> {
  const data: any = await storage.schedulesAfterDate(req.params.date)
  sendData(req, res, data)
}

export async function schedulesBeforeDate(req: Request, res: Response): Promise<void> {
  const data: any = await storage.schedulesBeforeDate(req.params.date)
  sendData(req, res, data)
}
