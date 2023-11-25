import processMethod from 'services/storage/method/process.method'
import * as cacheStorage from 'services/storage/cache.storage'
import queries from 'services/storage/query.storage'

export default async (key: string, method?: string, parameters?: any[]): Promise<any[]> => {
	try {
		const cachedData: any[] = cacheStorage.getData(key)

		if (cachedData) return cachedData

		const queryData: any[] = await queries[key]()

		if (queryData.length > 0) cacheStorage.setData(key, queryData)

		if (!method || !parameters) return processMethod(queryData, method, parameters)

		return processMethod(queries[method](parameters), method, parameters)
	} catch (error) {
		return []
	}
}
