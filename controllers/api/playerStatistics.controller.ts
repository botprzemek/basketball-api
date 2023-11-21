import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/sendData.util'

export async function playersStatistics(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.playersStatistics()
  sendData(req, res, data)
}

export async function playersStatisticsByTeamId(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.playersStatisticsByTeamId(BigInt(req.params.id))
  sendData(req, res, data)
}

export async function playersStatisticsTopPoints(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.playersStatisticsTopPoints()
  sendData(req, res, data)
}
