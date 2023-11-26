import cockroachStorage from 'services/storage/cockroach.storage'
import { ArenaQuery } from 'models/api/arena.model'

export const arenas = async (): Promise<ArenaQuery[]> =>
	cockroachStorage()`
		SELECT arena.*
		FROM arena 
		ORDER BY name ASC`

export const arenasById = async (parameters: any[]): Promise<ArenaQuery[]> =>
	cockroachStorage()`
		SELECT arena.*
		FROM arena 
		WHERE id = ${parameters[0]}`

export const arenasByCityId = async (parameters: any[]): Promise<ArenaQuery[]> =>
	cockroachStorage()`
		SELECT arena.*
		FROM arena 
		WHERE city_id = ${parameters[0]}`
