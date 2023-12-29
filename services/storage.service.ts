import QueryEnum from 'types/storage/query.enum'
import routes from 'utils/route.util'
import processMethod from 'services/storage/method/process.method'
import selectQuery from 'models/select.query'
import {getData, setData} from 'services/cache.service'
import deleteQuery from 'models/delete.query'
import insertQuery from 'models/insert.query'

const methods: any = {}

Object.keys(routes).forEach((key: string): void => {
	methods[key] = {
		create: async <QueryType>(data: QueryType[]): Promise<any[]> => insertQuery(key, data),
		update: async <QueryType>(query: QueryEnum, parameter: any, data: any): Promise<QueryType> => data,
			// queryStorage.update[key](query, parameter, data),
		get: async <QueryType>(query: QueryEnum, value: any): Promise<QueryType[]> => {
			const cachedData = getData(key)

			if (cachedData) return processMethod(cachedData, key, query, value)

			const queryData: QueryType[] = await selectQuery(key)

			if (queryData.length > 0) setData(key, queryData)
			if (!query || !value) return processMethod(queryData, key, query, value)

			return processMethod(await selectQuery(key, query, value), key, query, value)
		},
		delete: async <QueryType>(query: QueryEnum, parameter: any): Promise<QueryType[]> =>
			deleteQuery(key, query, parameter)
	}
})

export default methods
