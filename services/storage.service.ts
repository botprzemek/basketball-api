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
		create: async <QueryType>(query: QueryEnum, ...params: any[]): Promise<QueryType[]> => {
			const queryData: QueryType[] = await queryStorage[key](query, params)

			if (queryData.length > 0) cacheStorage.setData(key, queryData)
			if (!query || !params) return processMethod(queryData, key, query, params)

			return processMethod(await queryStorage.insert[key](query, params), key, query, params)
		},
		update: async <QueryType>(query: QueryEnum, ...params: any[]): Promise<QueryType[]> => {
			const queryData: QueryType[] = await queryStorage[key](query, params)

			if (queryData.length > 0) cacheStorage.setData(key, queryData)
			if (!query || !params) return processMethod(queryData, key, query, params)

			return processMethod(await queryStorage.update[key](query, params), key, query, params)
		},
		get: async <QueryType>(query: QueryEnum, ...params: any[]): Promise<QueryType[]> => {
			const cachedData: QueryType[] = cacheStorage.getData(key)

			console.log(key, query, params)

			if (cachedData) return processMethod(cachedData, key, query, params)

			const queryData: QueryType[] = await queryStorage.select[key]()

			if (queryData.length > 0) cacheStorage.setData(key, queryData)
			if (!query || !params) return processMethod(queryData, key, query, params)

			console.log(await queryStorage.select[key](query, params))

			return processMethod(await queryStorage.select[key](query, params), key, query, params)
		},
		delete: async <QueryType>(query: QueryEnum, ...params: any[]): Promise<QueryType[]> => {
			const queryData: QueryType[] = await queryStorage[key](query, params)

			if (queryData.length > 0) cacheStorage.setData(key, queryData)
			if (!query || !params) return processMethod(queryData, key, query, params)

			return processMethod(await queryStorage.delete[key](query, params), key, query, params)
		}
	}
})

export default methods
