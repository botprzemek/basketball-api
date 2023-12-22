import QueryEnum from 'types/storage/query.enum'
import queryStorage from 'services/storage/query.storage'
import routes from 'utils/route.util'
import processMethod from 'services/storage/method/process.method'
import selectQuery from 'models/select.query'
import { getData, setData } from 'services/storage/cache.storage'

const methods: any = {}

Object.keys(routes).forEach((key: string): void => {
	methods[key] = {
		create: async (data: any): Promise<boolean> => {
			return queryStorage.insert[key](data)
		},
		update: async <QueryType>(
			query: QueryEnum,
			parameter: any,
			data: any
		): Promise<QueryType> => {
			return queryStorage.update[key](query, parameter, data)
		},
		get: async <QueryType>(query: QueryEnum, value: any): Promise<QueryType[]> => {
			const cachedData = getData(key)

			if (cachedData) return processMethod(cachedData, key, query, value)

			const queryData: QueryType[] = await selectQuery(routes[key])

			if (queryData.length > 0) setData(key, queryData)
			if (!query || !value) return processMethod(queryData, key, query, value)

			return processMethod(await selectQuery(routes[key], query, value), key, query, value)
		},
		delete: async <QueryType>(query: QueryEnum, ...parameters: any[]): Promise<QueryType> => {
			return queryStorage.delete[key](query, parameters)
		}
	}
})

export default methods
