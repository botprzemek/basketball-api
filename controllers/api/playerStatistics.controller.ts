import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/send.util'

export async function playersStatistics(req: Request, res: Response): Promise<void> {
	const data: any[] = await storage('playersStatistics')
	sendData(req, res, data)
}

export async function playersStatisticsByTeamId(req: Request, res: Response): Promise<void> {
	const data: any[] = await storage('playersStatistics', 'playersStatisticsByTeamId', [
		BigInt(req.params.id)
	])
	sendData(req, res, data)
}

export async function playersStatisticsByPlayerId(req: Request, res: Response): Promise<void> {
	const data: any[] = await storage('playersStatistics', 'playersStatisticsByPlayerId', [
		BigInt(req.params.id)
	])
	sendData(req, res, data)
}

export async function playersStatisticsAvg(req: Request, res: Response): Promise<void> {
	const data: any[] = await storage('playersStatistics', 'playersStatisticsAvg', [])
	sendData(req, res, data)
}

export async function playersStatisticsAvgPoints(req: Request, res: Response): Promise<void> {
	const data: any[] = await storage('playersStatistics', 'playersStatisticsAvgPoints', [])
	sendData(req, res, data)
}

export async function playersStatisticsAvgRebounds(req: Request, res: Response): Promise<void> {
	const data: any[] = await storage('playersStatistics', 'playersStatisticsAvgRebounds', [])
	sendData(req, res, data)
}

export async function playersStatisticsAvgAssists(req: Request, res: Response): Promise<void> {
	const data: any[] = await storage('playersStatistics', 'playersStatisticsAvgAssists', [])
	sendData(req, res, data)
}

export async function playersStatisticsAvgByPlayerId(req: Request, res: Response): Promise<void> {
	const data: any[] = await storage('playersStatistics', 'playersStatisticsAvgByPlayerId', [
		BigInt(req.params.id)
	])
	sendData(req, res, data)
}
