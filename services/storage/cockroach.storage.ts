import { Pool, QueryResult } from 'pg'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import * as dotenv from 'dotenv'

dotenv.config()

const config = {
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT as string),
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
    ca: readFileSync(resolve('root.crt')).toString(),
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}

let pool: Pool

export default (query: string, parameters: any[], callback: (err: Error, result: QueryResult) => void): any => {
  if (!pool) pool = new Pool(config)
  pool.connect((error: Error): void => {
    return error
      ? console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] unable to connect to database (${error})`)
      : pool.query(query, parameters, callback)
  })
}
