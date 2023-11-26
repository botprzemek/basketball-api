import { League, LeagueQuery } from 'models/api/league.model'

export const leagues = (data: LeagueQuery): League => ({
	id: data.id,
	name: data.name
})

export const leaguesById = (data: LeagueQuery): League => ({
	id: data.id,
	name: data.name
})
