import { Database } from 'sqlite3'
import { open } from 'sqlite'

let database: any

export default async function initializeSqlite(): Promise<any> {
  if (!database) {
    database = await open({
      filename: global.__basedir + '/database.db',
      driver: Database,
    })
    await database.run(
      'CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR, last_name VARCHAR, email VARCHAR UNIQUE, password VARCHAR, verified INTEGER, verification_code VARCHAR, address VARCHAR)',
    )
  }
  return database
}
