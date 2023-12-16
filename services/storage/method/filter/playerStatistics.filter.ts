import { PlayerStatisticsQuery } from 'models/basketball/playerStatistics.model'

export const playersStatisticsByPlayerId = (
	data: PlayerStatisticsQuery[],
	[id]
): PlayerStatisticsQuery[] =>
	data.filter(
		(playerStatistics: PlayerStatisticsQuery): boolean =>
			BigInt(playerStatistics.player_id) === id
	)

export const playersStatisticsAvgByPlayerId = (
	data: PlayerStatisticsQuery[],
	[id]
): PlayerStatisticsQuery[] =>
	data.filter(
		(playerStatistics: PlayerStatisticsQuery): boolean =>
			BigInt(playerStatistics.player_id) === id
	)
