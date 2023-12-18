import cockroachStorage from 'services/storage/cockroach.storage'
import { ArenaQuery } from 'models/basketball/arena.model'
import QueryEnum from 'models/storage/query.enum'

export default async (query: QueryEnum, ...params: any[]): Promise<ArenaQuery[]> => {
	switch (query) {
		case QueryEnum.ID: {
			return cockroachStorage()`
				SELECT arena.*
				FROM arena 
				WHERE id = ${params.at(0)}`
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
