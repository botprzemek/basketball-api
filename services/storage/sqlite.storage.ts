let sqlite: any

export const assignSqlite = (sqliteOpened: any): any => {
  sqlite = sqliteOpened
  return sqlite
}

export const sqliteStorage = (): any => {
  return sqlite
}
