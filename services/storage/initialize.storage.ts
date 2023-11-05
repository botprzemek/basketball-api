import initializeSqlite from 'services/storage/sqlite/initialize.sqlite'
import initializePrisma from './prisma/initialize.prisma'
import initializeCache from './cache/initialize.cache'

export default (): void => {
  void initializeSqlite()
  void initializePrisma()
  void initializeCache()
}
