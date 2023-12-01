import {League, LeagueQuery} from 'models/api/league.model'

export const leagues = (data: LeagueQuery): League => ({
	id: data.id,
	arena_id: data.arena_id,
	city_id: data.city_id,
	name: data.name
})
