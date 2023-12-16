export interface TeamStatisticsQuery {
	readonly id: bigint
	readonly match_id: bigint
	readonly team_id: bigint
	readonly minutes: number
	readonly inside_fgm: number
	readonly inside_fga: number
	readonly outside_fgm: number
	readonly outside_fga: number
	readonly freethrows_fgm: number
	readonly freethrows_fga: number
	readonly assists: number
	readonly rebounds_off: number
	readonly rebounds_def: number
	readonly blocks: number
	readonly steals: number
	readonly turnovers: number
	readonly fouls: number
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
