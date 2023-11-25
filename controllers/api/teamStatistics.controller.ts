import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/sendData.util'

export async function teamStatisticsByTeamId(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.teamStatisticsByTeamId()
  sendData(req, res, data)
}

export async function teamStatisticsAvgByTeamId(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.teamStatisticsAvgByTeamId(BigInt(req.params.id))
  sendData(req, res, data)
}

export async function teamStatisticsByMatchId(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.teamStatisticsByMatchId(BigInt(req.params.id))
  sendData(req, res, data)
}
