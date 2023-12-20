import * as cacheStorage from 'services/storage/cache.storage'
import setupCache from 'services/cache/setup.cache'

export default (): void => {
	cacheStorage.initialize()
	void setupCache()
}
