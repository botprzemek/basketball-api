import initializeSqlite from 'services/storage/sqlite/initialize.sqlite'
import initializeCache from 'services/cache/initialize.cache'

export default (): void => {
	void initializeSqlite()
	void initializeCache()
}
