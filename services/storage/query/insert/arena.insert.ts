import cockroachStorage from 'services/storage/cockroach.storage'
import QueryEnum from 'models/storage/query.enum'
import { ArenaQuery } from 'models/basketball/arena.model'

export default async (query: QueryEnum, params: any[]): Promise<ArenaQuery[]> => {
	switch (query) {
		case QueryEnum.CITY_ID: {
			return cockroachStorage()<ArenaQuery[]>`
				INSERT INTO arena (city_id, name, location) 
				VALUES (${params.at(0)}, ${params.at(1)}, ${params.at(2)}) 
				ON CONFLICT (name, location) DO NOTHING
				RETURNING *`
		}
		default: {
			return []
		}
	}
}
