import { RosterQuery } from 'models/api/roster.model'

export const rostersById = (data: RosterQuery[], [id]): RosterQuery[] =>
	data.filter((roster: RosterQuery): boolean => BigInt(roster.id) === id)
