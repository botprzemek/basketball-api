import { Arena, ArenaQuery } from 'types/basketball/arena.model'

export default (data: ArenaQuery): Arena => ({
	id: data.id,
	name: data.name,
	location: data.location
})
