import {
	PlayerStatistics,
	PlayerStatisticsAvg,
	PlayerStatisticsAvgAssists,
	PlayerStatisticsAvgPoints,
	PlayerStatisticsAvgQuery,
	PlayerStatisticsAvgRebounds,
	PlayerStatisticsQuery
} from 'models/basketball/playerStatistics.model'

export const playersStatistics = (data: PlayerStatisticsQuery): PlayerStatistics => ({
	match_id: data.match_id,
	player_id: data.player_id,
	team_id: data.team_id,
	minutes: data.minutes,
	inside_fgm: data.inside_fgm,
	inside_fga: data.inside_fga,
	outside_fgm: data.outside_fgm,
	outside_fga: data.outside_fga,
	freethrows_fgm: data.freethrows_fgm,
	freethrows_fga: data.freethrows_fga,
	assists: data.assists,
	rebounds_off: data.rebounds_off,
	rebounds_def: data.rebounds_def,
	blocks: data.blocks,
	steals: data.steals,
	turnovers: data.turnovers,
	fouls: data.fouls
})

export const playersStatisticsAvg = (data: PlayerStatisticsAvgQuery): PlayerStatisticsAvg => ({
	player_id: data.player_id,
	team_id: data.team_id,
	games_played: Number(data.games_played),
	minutes: data.minutes / data.games_played,
	points: (data.freethrows_fgm + data.inside_fgm * 2 + data.outside_fgm * 3) / data.games_played,
	inside_fgm: data.inside_fgm / data.games_played,
	inside_fga: data.inside_fga / data.games_played,
	outside_fgm: data.outside_fgm / data.games_played,
	outside_fga: data.outside_fga / data.games_played,
	freethrows_fgm: data.freethrows_fgm / data.games_played,
	freethrows_fga: data.freethrows_fga / data.games_played,
	assists: data.assists / data.games_played,
	rebounds_sum: (data.rebounds_off + data.rebounds_def) / data.games_played,
	rebounds_off: data.rebounds_off / data.games_played,
	rebounds_def: data.rebounds_def / data.games_played,
	blocks: data.blocks / data.games_played,
	steals: data.steals / data.games_played,
	turnovers: data.turnovers / data.games_played,
	fouls: data.fouls / data.games_played
})

export const playersStatisticsAvgPoints = (
	data: PlayerStatisticsAvgQuery
): PlayerStatisticsAvgPoints => ({
	player_id: data.player_id,
	team_id: data.team_id,
	games_played: Number(data.games_played),
	points: (data.freethrows_fgm + data.inside_fgm * 2 + data.outside_fgm * 3) / data.games_played,
	inside_fgm: data.inside_fgm / data.games_played,
	inside_fga: data.inside_fga / data.games_played,
	outside_fgm: data.outside_fgm / data.games_played,
	outside_fga: data.outside_fga / data.games_played,
	freethrows_fgm: data.freethrows_fgm / data.games_played,
	freethrows_fga: data.freethrows_fga / data.games_played
})

export const playersStatisticsAvgRebounds = (
	data: PlayerStatisticsAvgQuery
): PlayerStatisticsAvgRebounds => ({
	player_id: data.player_id,
	team_id: data.team_id,
	games_played: Number(data.games_played),
	rebounds_sum: (data.rebounds_off + data.rebounds_def) / data.games_played,
	rebounds_off: data.rebounds_off / data.games_played,
	rebounds_def: data.rebounds_def / data.games_played
})

export const playersStatisticsAvgAssists = (
	data: PlayerStatisticsAvgQuery
): PlayerStatisticsAvgAssists => ({
	player_id: data.player_id,
	team_id: data.team_id,
	games_played: Number(data.games_played),
	assists: data.assists / data.games_played
})
