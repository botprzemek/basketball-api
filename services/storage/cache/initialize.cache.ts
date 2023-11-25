import * as cacheStorage from 'services/storage/cache.storage'

export default (): void => {
	cacheStorage.initialize()
}
