import { TeamStatistics, TeamStatisticsQuery } from 'models/api/teamStatistics.model'

export const teamStatistics = (data: TeamStatisticsQuery): TeamStatistics => ({
	id: data.id,
	match_id: data.match_id,
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
