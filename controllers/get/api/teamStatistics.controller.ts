import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/send.util'
import { TeamStatistics } from 'models/api/teamStatistics.model'

export async function getTeamStatisticsByTeamId(req: Request, res: Response): Promise<void> {
	const data: TeamStatistics[] = await storage('teamStatistics', 'teamStatisticsByTeamId', [
		req.params.id ? BigInt(req.params.id) : 0
	])
	sendData(req, res, data)
}

export async function getTeamStatisticsAvgByTeamId(req: Request, res: Response): Promise<void> {
	const data: TeamStatistics[] = await storage('teamStatistics', 'teamStatisticsAvgByTeamId', [
		req.params.id ? BigInt(req.params.id) : 0
	])
	sendData(req, res, data)
}

export async function getTeamStatisticsByMatchId(req: Request, res: Response): Promise<void> {
	const data: TeamStatistics[] = await storage('teamStatistics', 'teamStatisticsByMatchId', [
		req.params.id ? BigInt(req.params.id) : 0
	])
	sendData(req, res, data)
}
