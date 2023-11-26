import { Arena, ArenaQuery } from 'models/api/arena.model'

export const arenas = (data: ArenaQuery): Arena => ({
	id: data.id,
	name: data.name,
	location: data.location
})

export const arenasById = (data: ArenaQuery): Arena => ({
	id: data.id,
	name: data.name,
	location: data.location
})

export const arenasByCityId = (data: ArenaQuery): Arena => ({
	id: data.id,
	name: data.name,
	location: data.location
})
