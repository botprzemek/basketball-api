import { ArenaQuery } from 'types/basketball/arena.model'
import QueryEnum from 'types/storage/query.enum'

export default (data: ArenaQuery[], query: QueryEnum, params: any[]): ArenaQuery[] => {
	switch (query) {
		case QueryEnum.ID:
		case QueryEnum.CITY_ID: {
			return data.filter(
				(arena: ArenaQuery): boolean => BigInt(arena[query.toLowerCase()]) === params.at(0)
			)
		}
		case QueryEnum.NAME:
		case QueryEnum.TEAM_NAME:
		case QueryEnum.LOCATION: {
			return data.filter((arena: ArenaQuery): boolean => {
				console.log(
					query.toLowerCase(),
					params.at(0),
					arena[query.toLowerCase()].includes(params.at(0))
				)
				return arena[query.toLowerCase()].includes(params.at(0))
			})
		}
		default: {
			return data
		}
	}
}
