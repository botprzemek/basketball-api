import QueryEnum from 'types/storage/query.enum'
import routes from 'utils/route.util'
import selectQuery from 'models/select.query'
import deleteQuery from 'models/delete.query'
import insertQuery from 'models/insert.query'
import updateQuery from 'models/update.query'
import processMethod from 'services/storage/method/process.method'
import { getData, setData } from 'services/cache.service'

const methods: any = {}

Object.keys(routes).forEach((key: string): void => {
	methods[key] = {
		create: async (data: any[]): Promise<any[]> => {
			const queryData: any[] = await insertQuery(key, data)
			return queryData.length > 0 ? getData(key) : []
		},
		update: async (query: QueryEnum, parameter: any, data: any): Promise<any[]> => {
			const queryData: any[] = await updateQuery(key, query, parameter, data)

			if (queryData.length === 0) return queryData

			const cachedData: { id: bigint; [key: string]: any }[] = getData(key)

			if (!cachedData) return queryData

			cachedData.map((cached: { id: bigint; [key: string]: any }, index: number): void => {
				if (cached.id !== data.id) return
				cachedData[index] = data
			})

			cachedData.sort((a: any, b: any): number =>
				a.name && b.name ? a.name.localeCompare(b.name) : 0
			)

			return setData(key, cachedData)
		},
		get: async (query: QueryEnum, value: any): Promise<any[]> => {
			const cachedData = getData(key)

			if (cachedData) return processMethod(cachedData, key, query, value)

			const queryData: any[] = await selectQuery(key)

			if (queryData.length > 0) setData(key, queryData)
			if (!query || !value) return processMethod(queryData, key, query, value)

			return processMethod(await selectQuery(key, query, value), key, query, value)
		},
		delete: async (query: QueryEnum, parameter: any): Promise<any[]> =>
			deleteQuery(key, query, parameter)
	}
})

export default methods
