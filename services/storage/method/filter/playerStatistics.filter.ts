export const playersStatisticsByPlayerId = (data: any[], [id]): any[] =>
	data.filter((playerStatistics: any): boolean => playerStatistics.player_id === `${id}`)

export const playersStatisticsAvgByPlayerId = (data: any[], [id]): any[] =>
	data.filter((playerStatistics: any): boolean => playerStatistics.player_id === `${id}`)
