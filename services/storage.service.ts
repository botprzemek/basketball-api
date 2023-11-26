import processMethod from 'services/storage/method/process.method'
import * as cacheStorage from 'services/storage/cache.storage'
import queries from 'services/storage/method/query.method'

export default async <TypeQuery>(key: string, method?: string, parameters?: any[]): Promise<TypeQuery[]> => {
	try {
		const cachedData: TypeQuery[] = cacheStorage.getData(key)

		if (cachedData) return processMethod(cachedData, method, parameters)

		const queryData: TypeQuery[] = await queries[key]()

		if (queryData.length > 0) cacheStorage.setData(key, queryData)

		if (!method || !parameters) return processMethod(queryData, method, parameters)

		return processMethod(await queries[method](parameters), method, parameters)
	} catch {
		return []
	}
}
