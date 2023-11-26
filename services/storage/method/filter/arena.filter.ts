import { ArenaQuery } from 'models/api/arena.model'

export const arenasById = (data: ArenaQuery[], [id]): ArenaQuery[] =>
	data.filter((arena: ArenaQuery): boolean => arena.id === id)

export const arenasByCityId = (data: ArenaQuery[], [id]): ArenaQuery[] =>
	data.filter((arena: ArenaQuery): boolean => arena.city_id === id)
