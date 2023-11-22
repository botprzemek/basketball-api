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

export async function playersStatisticsAvg(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.playersStatisticsAvg()
  sendData(req, res, data)
}

export async function playersStatisticsAvgPoints(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.playersStatisticsAvgPoints()
  sendData(req, res, data)
}

export async function playersStatisticsAvgRebounds(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.playersStatisticsAvgRebounds()
  sendData(req, res, data)
}

export async function playersStatisticsAvgAssists(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.playersStatisticsAvgAssists()
  sendData(req, res, data)
}

export async function playersStatisticsAvgById(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.playersStatisticsAvgById(BigInt(req.params.id))
  sendData(req, res, data)
}
