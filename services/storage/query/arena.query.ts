import cockroachStorage from 'services/storage/cockroach.storage'
import { ArenaQuery } from 'models/api/arena.model'

export const arenas = async (): Promise<ArenaQuery[]> =>
	cockroachStorage()`
		SELECT arena.*
		FROM arena 
		ORDER BY name ASC`

export const arenasById = async ([id]): Promise<ArenaQuery[]> =>
	cockroachStorage()`
		SELECT arena.*
		FROM arena 
		WHERE id = ${id}`

export const arenasByCityId = async ([id]): Promise<ArenaQuery[]> =>
	cockroachStorage()`
		SELECT arena.*
		FROM arena 
		WHERE city_id = ${id}`
