import * as cacheStorage from 'services/cache.service'
import setupCache from 'services/cache/setup.cache'

export default (): void => {
	cacheStorage.initialize()
	void setupCache()
}
