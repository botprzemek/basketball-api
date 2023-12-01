import processMethod from 'services/storage/method/process.method'
import * as cacheStorage from 'services/storage/cache.storage'
import queries from 'services/storage/query.storage'

export default async <TypeQuery>(
	key: string,
	method?: string,
	parameters?: any[]
): Promise<TypeQuery[]> => {
	try {
		const cachedData: TypeQuery[] = cacheStorage.getData(key)

		if (cachedData) return processMethod(cachedData, key, method, parameters)

		const queryData: TypeQuery[] = await queries[key]()

		if (queryData.length > 0) cacheStorage.setData(key, queryData)

		if (!method || !parameters) return processMethod(queryData, key, method, parameters)

		return processMethod(await queries[method](parameters), key, method, parameters)
	} catch {
		return []
	}
}
