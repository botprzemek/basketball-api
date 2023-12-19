import cockroachStorage from 'services/storage/cockroach.storage'
import { ArenaQuery } from 'types/basketball/arena.model'
import QueryEnum from 'types/storage/query.enum'

export default async (query: QueryEnum, ...params: any[]): Promise<ArenaQuery[]> => {
	switch (query) {
		case QueryEnum.ID: {
			return cockroachStorage()<ArenaQuery[]>`
				SELECT arena.*
				FROM arena 
				WHERE id = ${params.at(0)}`
		}
		case QueryEnum.CITY_ID: {
			return cockroachStorage()<ArenaQuery[]>`
				SELECT arena.*
				FROM arena 
				WHERE city_id = ${params.at(0)}`
		}
		default: {
			return cockroachStorage()<ArenaQuery[]>`
				SELECT arena.*
				FROM arena 
				ORDER BY name ASC`
		}
	}
}
