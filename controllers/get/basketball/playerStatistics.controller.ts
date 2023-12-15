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

export async function getPlayersStatistics(req: Request, res: Response): Promise<void> {
	const data: PlayerStatistics[] = await storage('playersStatistics')
	sendData(req, res, data)
}

export async function getPlayersStatisticsByTeamId(req: Request, res: Response): Promise<void> {
	const data: PlayerStatistics[] = await storage(
		'playersStatistics',
		'playersStatisticsByTeamId',
		[req.params.id ? BigInt(req.params.id) : 0]
	)
	sendData(req, res, data)
}

export async function getPlayersStatisticsByPlayerId(req: Request, res: Response): Promise<void> {
	const data: PlayerStatistics[] = await storage(
		'playersStatistics',
		'playersStatisticsByPlayerId',
		[req.params.id ? BigInt(req.params.id) : 0]
	)
	sendData(req, res, data)
}

export async function getPlayersStatisticsAvg(req: Request, res: Response): Promise<void> {
	const data: PlayerStatisticsAvg[] = await storage(
		'playersStatisticsAvg',
		'playersStatisticsAvg',
		[]
	)
	sendData(req, res, data)
}

export async function getPlayersStatisticsAvgByPlayerId(
	req: Request,
	res: Response
): Promise<void> {
	const data: PlayerStatisticsAvg[] = await storage(
		'playersStatisticsAvg',
		'playersStatisticsAvgByPlayerId',
		[req.params.id ? BigInt(req.params.id) : 0]
	)
	sendData(req, res, data)
}

export async function getPlayersStatisticsAvgByTeamId(req: Request, res: Response): Promise<void> {
	const data: PlayerStatisticsAvg[] = await storage(
		'playersStatisticsAvg',
		'playersStatisticsAvgByTeamId',
		[req.params.id ? BigInt(req.params.id) : 0]
	)
	sendData(req, res, data)
}

export async function getPlayersStatisticsAvgPoints(req: Request, res: Response): Promise<void> {
	const data: PlayerStatisticsAvgPoints[] = await storage(
		'playersStatisticsAvg',
		'playersStatisticsAvgPoints',
		[]
	)
	sendData(req, res, data)
}

export async function getPlayersStatisticsAvgRebounds(req: Request, res: Response): Promise<void> {
	const data: PlayerStatisticsAvgRebounds[] = await storage(
		'playersStatisticsAvg',
		'playersStatisticsAvgRebounds',
		[]
	)
	sendData(req, res, data)
}

export async function getPlayersStatisticsAvgAssists(req: Request, res: Response): Promise<void> {
	const data: PlayerStatisticsAvgAssists[] = await storage(
		'playersStatisticsAvg',
		'playersStatisticsAvgAssists',
		[]
	)
	sendData(req, res, data)
}
