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
		update: async (query: QueryEnum, ...parameters: any[]): Promise<boolean> => {
			return queryStorage.update[key](query, parameters)
		},
		get: async <QueryType>(query: QueryEnum, parameter: any): Promise<QueryType[]> => {
			const cachedData = getData(key)

			if (cachedData) return processMethod(cachedData, key, query, parameter)

			const queryData: QueryType[] = await selectQuery(routes[key])

			if (queryData.length > 0) setData(key, queryData)
			if (!query || !parameter) return processMethod(queryData, key, query, parameter)

			return processMethod(
				await selectQuery(routes[key], query, parameter),
				key,
				query,
				parameter
			)
		},
		delete: async (query: QueryEnum, ...parameters: any[]): Promise<boolean> => {
			return queryStorage.delete[key](query, parameters)
		}
	}
})

export default methods
