import { RosterQuery } from 'models/basketball/roster.model'

export const rostersById = (data: RosterQuery[], [id]): RosterQuery[] =>
	data.filter((roster: RosterQuery): boolean => BigInt(roster.id) === id)

export const rostersByMatchId = (data: RosterQuery[], [id]): RosterQuery[] => {
	console.log(data)
	return data.filter((roster: RosterQuery): boolean => BigInt(roster.match_id) === id)
}
