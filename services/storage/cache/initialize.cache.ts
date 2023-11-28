import * as cacheStorage from 'services/storage/cache.storage'
import setupCache from "services/storage/cache/setup.cache";

export default (): void => {
	cacheStorage.initialize()
	void setupCache()
}
