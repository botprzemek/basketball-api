import { LeagueQuery } from 'types/basketball/league.model'

export const leaguesById = (data: LeagueQuery[], [id]): LeagueQuery[] =>
	data.filter((league: LeagueQuery): boolean => BigInt(league.id) === id)
