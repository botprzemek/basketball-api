import QueryEnum from 'models/storage/query.enum'
import queryStorage from 'services/storage/query.storage'
import * as cacheStorage from 'services/storage/cache.storage'
import processMethod from 'services/storage/method/process.method'

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
		create: async (query: QueryEnum, ...params: any[]): Promise<boolean> => {
			return queryStorage.insert[key](query, params)
		},
		update: async (query: QueryEnum, ...params: any[]): Promise<boolean> => {
			return queryStorage.update[key](query, params)
		},
		get: async <QueryType>(query: QueryEnum, ...params: any[]): Promise<QueryType[]> => {
			const cachedData: QueryType[] = cacheStorage.getData(key)

			if (cachedData) return processMethod(cachedData, key, query, params)

			const queryData: QueryType[] = await queryStorage.select[key]()

			if (queryData.length > 0) cacheStorage.setData(key, queryData)
			if (!query || !params) return processMethod(queryData, key, query, params)

			console.log(await queryStorage.select[key](query, params))

			return processMethod(await queryStorage.select[key](query, params), key, query, params)
		},
		delete: async (query: QueryEnum, ...params: any[]): Promise<boolean> => {
			return queryStorage.delete[key](query, params)
		}
	}
})

export default methods
