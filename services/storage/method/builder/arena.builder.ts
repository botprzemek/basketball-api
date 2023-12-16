import { Arena, ArenaQuery } from 'models/basketball/arena.model'

export const arenas = (data: ArenaQuery): Arena => ({
	id: data.id,
	name: data.name,
	location: data.location
})
