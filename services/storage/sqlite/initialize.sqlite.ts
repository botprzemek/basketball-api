import { Database } from 'sqlite3'
import { open } from 'sqlite'
import { assignSqlite, sqliteStorage } from '../sqlite.storage'

export default async function initializeSqlite(): Promise<void> {
  if (sqliteStorage()) return

  assignSqlite(
    await open({
      filename: global.__basedir + '/database.db',
      driver: Database,
    }),
  )

  await sqliteStorage().run(
    'CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR, last_name VARCHAR, email VARCHAR UNIQUE, password VARCHAR, verified INTEGER, verification_code VARCHAR, address VARCHAR)',
  )
}
