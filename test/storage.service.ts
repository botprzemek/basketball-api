import QueryEnum from 'models/storage/query.enum'
import queryStorage from 'services/storage/query.storage'

const routes: string[] = [
	'arenas',
	'cities',
	'fund',
	'leagues',
	'matches',
	'players',
	'playerStatistics',
	'rosters',
	'staff',
	'teams',
	'teamStatistics'
]

const methods: any = {}

routes.forEach((key: string): void => {
	methods[key] = {
		create: async (query: QueryEnum, params: any[]): Promise<any[]> => queryStorage[key](query, params),
		update: async (query: QueryEnum, params: any[]): Promise<any[]> => queryStorage[key](query, params),
		get: async (query: QueryEnum, params: any[]): Promise<any[]> => queryStorage[key](query, params),
		delete: async (query: QueryEnum, params: any[]): Promise<any[]> => queryStorage[key](query, params),
	}
})

export default methods