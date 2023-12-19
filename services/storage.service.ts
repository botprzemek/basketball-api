import QueryEnum from 'types/storage/query.enum'
import queryStorage from 'services/storage/query.storage'
import routes from 'utils/route.util'
import processMethod from 'services/storage/method/process.method'
import { getData, setData } from 'services/storage/cache.storage'

const methods: any = {}

routes.forEach((key: string): void => {
	methods[key] = {
		create: async (query?: QueryEnum, ...params: any[]): Promise<boolean> => {
			return queryStorage.insert[key](query, params)
		},
		update: async (query: QueryEnum, ...params: any[]): Promise<boolean> => {
			return queryStorage.update[key](query, params)
		},
		get: async <QueryType>(query: QueryEnum, ...params: any[]): Promise<QueryType[]> => {
			const cachedData = getData(key)

			if (cachedData) return processMethod(cachedData, key, query, params)

			const queryData = await queryStorage.select[key]()

			if (queryData.length > 0) setData(key, queryData)
			if (!query || !params) return processMethod(queryData, key, query, params)

			return processMethod(await queryStorage.select[key](query, params), key, query, params)
		},
		delete: async (query: QueryEnum, ...params: any[]): Promise<boolean> => {
			return queryStorage.delete[key](query, params)
		}
	}
})

export default methods
