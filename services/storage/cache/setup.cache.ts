import * as cacheStorage from 'services/storage/cache.storage'
import storage from 'services/storage.service'
import cacheConfig from 'configs/cache.config'

export default async (): Promise<void> => {
  if (!cacheConfig.enabled) return
  for (const route of cacheConfig.routes) cacheStorage.setData(route, await storage[route]())
}
