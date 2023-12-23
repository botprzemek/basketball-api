import { League, LeagueQuery } from 'types/basketball/league.model'

export default (data: LeagueQuery): League => ({
	id: data.id,
	arena_id: data.arena_id,
	city_id: data.city_id,
	name: data.name
})
