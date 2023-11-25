import * as cacheStorage from 'services/storage/cache.storage'
import queries from 'services/storage/query.storage'

export default async <TypeSelected>(key: string, method?: string, parameters?: any[]): Promise<TypeSelected[]> => {
  try {
    const cachedData: TypeSelected[] = cacheStorage.getData(key)

    if (cachedData) return cachedData

    const queryData: any[] = await queries[key]()

    if (queryData.length > 0) cacheStorage.setData(key, queryData)

    if (!method || !parameters) return queryData

    return queries[method](parameters)
  } catch (error) {
    return []
  }
}
