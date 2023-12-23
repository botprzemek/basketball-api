import { Team, TeamQuery } from 'types/basketball/team.model'

export default (data: TeamQuery): Team => ({
	id: data.id,
	league_id: data.league_id,
	name: data.name,
	won: parseInt(data.won),
	lost: parseInt(data.lost)
})
