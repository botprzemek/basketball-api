import cockroachStorage from 'services/storage/cockroach.storage'
import QueryEnum from 'types/storage/query.enum'
import { ArenaQuery } from 'types/basketball/arena.model'

export default async (query: QueryEnum, parameter: bigint): Promise<ArenaQuery[]> => {
	switch (query) {
		case QueryEnum.ID: {
			return cockroachStorage()`
				DELETE FROM arena 
				WHERE id = ${parameter.toString()} 
				RETURNING *`
		}
		case QueryEnum.CITY_ID: {
			return cockroachStorage()`
				DELETE FROM arena 
				WHERE city_id = ${parameter.toString()} 
				RETURNING *`
		}
		default: {
			return []
		}
	}
}
