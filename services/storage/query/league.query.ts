import cockroachStorage from 'services/storage/cockroach.storage'
import { LeagueQuery } from 'models/api/league.model'

export const leagues = async (): Promise<LeagueQuery[]> =>
	cockroachStorage()`
		SELECT league.* 
		FROM league 
		ORDER BY name ASC`

export const leaguesById = async ([id]: number[]): Promise<LeagueQuery[]> =>
	cockroachStorage()`
		SELECT league.* 
		FROM league 
		WHERE id = ${id}`
