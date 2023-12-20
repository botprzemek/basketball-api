import storageService from 'services/storage.service'
import cacheConfig from 'configs/cache.config'
import routes from 'utils/route.util'

export default async (): Promise<void> => {
	if (!cacheConfig.enabled) return
	for (const key of Object.keys(routes)) await storageService[key].get()
}
