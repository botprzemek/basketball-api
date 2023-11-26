export interface TeamStatisticsQuery {
	id: bigint
	match_id: bigint
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

export interface TeamStatistics {
	id: bigint
	match_id: bigint
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
