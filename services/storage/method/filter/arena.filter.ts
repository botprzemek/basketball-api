import { ArenaQuery } from 'models/basketball/arena.model'
import QueryEnum from 'models/storage/query.enum'

export default (data: ArenaQuery[], query: QueryEnum, params: any[]): ArenaQuery[] => {
	switch (query) {
		case QueryEnum.ID: {
			return data.filter((arena: ArenaQuery): boolean => BigInt(arena.id) === params.at(0))
		}
		case QueryEnum.CITY_ID: {
			return data.filter(
				(arena: ArenaQuery): boolean => BigInt(arena.city_id) === params.at(0)
			)
		}
		default: {
			return data
		}
	}
}
