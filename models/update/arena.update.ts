import cockroachStorage from 'services/storage/cockroach.storage'
import { ArenaQuery } from 'types/basketball/arena.model'
import QueryEnum from 'types/storage/query.enum'

// TODO

export default async (query: QueryEnum, ...params: any[]): Promise<ArenaQuery[]> => {
	switch (query) {
		case QueryEnum.ID: {
			return cockroachStorage()`
				INSERT INTO arena (city_id, name, location) 
				VALUES (${params.at(0)}, ${params.at(1)}, ${params.at(2)}) 
				ON CONFLICT (name, location) DO NOTHING
				RETURNING *`
		}
		case QueryEnum.CITY_ID: {
			return cockroachStorage()`
				SELECT arena.*
				FROM arena 
				WHERE city_id = ${params.at(0)}`
		}
		default: {
			return cockroachStorage()`
				SELECT arena.*
				FROM arena 
				ORDER BY name ASC`
		}
	}
}
