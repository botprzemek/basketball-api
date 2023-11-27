import { LeagueQuery } from 'models/api/league.model'

export const leaguesById = (data: LeagueQuery[], [id]): LeagueQuery[] =>
	data.filter((league: LeagueQuery): boolean => BigInt(league.id) === id)
