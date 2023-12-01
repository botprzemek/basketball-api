export interface PlayerStatisticsQuery {
	id: bigint
	match_id: bigint
	player_id: bigint
	team_id: bigint
	minutes: number
	inside_fgm: number
	inside_fga: number
	outside_fgm: number
	outside_fga: number
	freethrows_fgm: number
	freethrows_fga: number
	assists: number
	rebounds_off: number
	rebounds_def: number
	blocks: number
	steals: number
	turnovers: number
	fouls: number
}

export interface PlayerStatistics {
	match_id: bigint
	player_id: bigint
	team_id: bigint
	minutes: number
	inside_fgm: number
	inside_fga: number
	outside_fgm: number
	outside_fga: number
	freethrows_fgm: number
	freethrows_fga: number
	assists: number
	rebounds_off: number
	rebounds_def: number
	blocks: number
	steals: number
	turnovers: number
	fouls: number
}

export interface PlayerStatisticsAvgQuery {
	player_id: bigint
	team_id: bigint
	games_played: number
	minutes: number
	inside_fgm: number
	inside_fga: number
	outside_fgm: number
	outside_fga: number
	freethrows_fgm: number
	freethrows_fga: number
	assists: number
	rebounds_off: number
	rebounds_def: number
	blocks: number
	steals: number
	turnovers: number
	fouls: number
}

export interface PlayerStatisticsAvg {
	player_id: bigint
	team_id: bigint
	games_played: number
	minutes: number
	points: number
	inside_fgm: number
	inside_fga: number
	outside_fgm: number
	outside_fga: number
	freethrows_fgm: number
	freethrows_fga: number
	assists: number
	rebounds_sum: number
	rebounds_off: number
	rebounds_def: number
	blocks: number
	steals: number
	turnovers: number
	fouls: number
}

export interface PlayerStatisticsAvgPoints {
	player_id: bigint
	team_id: bigint
	games_played: number
	points: number
	inside_fgm: number
	inside_fga: number
	outside_fgm: number
	outside_fga: number
	freethrows_fgm: number
	freethrows_fga: number
}

export interface PlayerStatisticsAvgRebounds {
	player_id: bigint
	team_id: bigint
	games_played: number
	rebounds_sum: number
	rebounds_off: number
	rebounds_def: number
}

export interface PlayerStatisticsAvgAssists {
	player_id: bigint
	team_id: bigint
	games_played: number
	assists: number
}
