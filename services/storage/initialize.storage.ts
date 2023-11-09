import initializeSqlite from 'services/storage/sqlite/initialize.sqlite'

export default (): void => {
  void initializeSqlite()
  // void initializePrisma()
  // void initializeCache()
}
