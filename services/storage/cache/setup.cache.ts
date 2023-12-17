import storageService from 'services/storage.service'
import cacheConfig from 'configs/cache.config'

export default async (): Promise<void> => {
	if (!cacheConfig.enabled) return
	for (const key of cacheConfig.routes) await storageService[key].get()
}
