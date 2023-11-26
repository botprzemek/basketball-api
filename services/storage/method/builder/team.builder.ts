import { Team, TeamQuery } from 'models/api/team.model'

export const teams = (data: TeamQuery): Team => ({
	id: data.id,
	league_id: data.league_id,
	name: data.name,
	won: data.won,
	lost: data.lost
})
