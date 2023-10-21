import { Database } from 'sqlite3'
import { open } from 'sqlite'

let database: any

export default function initializeSqlite(): void {
  if (!database) {
    database = open({
      filename: global.__basedir + '/database.db',
      driver: Database,
    }).then((database) =>
      database.run(
        'CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR, last_name VARCHAR, email VARCHAR UNIQUE, password VARCHAR, verified INTEGER, verification_code VARCHAR, address VARCHAR)',
      ),
    )
  }
  return database
}
