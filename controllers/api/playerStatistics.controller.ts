import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/send.util'
import {
	PlayerStatistics,
	PlayerStatisticsAvg,
	PlayerStatisticsAvgAssists,
	PlayerStatisticsAvgPoints,
	PlayerStatisticsAvgRebounds
} from 'models/api/playerStatistics.model'

export async function playersStatistics(req: Request, res: Response): Promise<void> {
	const data: PlayerStatistics[] = await storage('playersStatistics')
	sendData(req, res, data)
}

export async function playersStatisticsByTeamId(req: Request, res: Response): Promise<void> {
	const data: PlayerStatistics[] = await storage(
		'playersStatistics',
		'playersStatisticsByTeamId',
		[BigInt(req.params.id || 0)]
	)
	sendData(req, res, data)
}

export async function playersStatisticsByPlayerId(req: Request, res: Response): Promise<void> {
	const data: PlayerStatistics[] = await storage(
		'playersStatistics',
		'playersStatisticsByPlayerId',
		[BigInt(req.params.id || 0)]
	)
	sendData(req, res, data)
}

export async function playersStatisticsAvg(req: Request, res: Response): Promise<void> {
	const data: PlayerStatisticsAvg[] = await storage(
		'playersStatistics',
		'playersStatisticsAvg',
		[]
	)
	sendData(req, res, data)
}

export async function playersStatisticsAvgByPlayerId(req: Request, res: Response): Promise<void> {
	const data: PlayerStatisticsAvg[] = await storage(
		'playersStatistics',
		'playersStatisticsAvgByPlayerId',
		[BigInt(req.params.id || 0)]
	)
	sendData(req, res, data)
}

export async function playersStatisticsAvgByTeamId(req: Request, res: Response): Promise<void> {
	const data: PlayerStatisticsAvg[] = await storage(
		'playersStatistics',
		'playersStatisticsAvgByTeamId',
		[BigInt(req.params.id || 0)]
	)
	sendData(req, res, data)
}

export async function playersStatisticsAvgPoints(req: Request, res: Response): Promise<void> {
	const data: PlayerStatisticsAvgPoints[] = await storage(
		'playersStatistics',
		'playersStatisticsAvgPoints',
		[]
	)
	sendData(req, res, data)
}

export async function playersStatisticsAvgRebounds(req: Request, res: Response): Promise<void> {
	const data: PlayerStatisticsAvgRebounds[] = await storage(
		'playersStatistics',
		'playersStatisticsAvgRebounds',
		[]
	)
	sendData(req, res, data)
}

export async function playersStatisticsAvgAssists(req: Request, res: Response): Promise<void> {
	const data: PlayerStatisticsAvgAssists[] = await storage(
		'playersStatistics',
		'playersStatisticsAvgAssists',
		[]
	)
	sendData(req, res, data)
}
