import { readFileSync } from 'fs'
import { resolve } from 'path'
import * as dotenv from 'dotenv'
import * as postgres from 'postgres'

dotenv.config()

const config = {
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT as string),
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
    ca: readFileSync(resolve('root.crt')).toString(),
  },
  max: 20,
  idle_timeout: 30000,
  connection_timeout: 2000,
}

let sql: postgres.Sql

export default (): postgres.Sql => {
  if (!sql) sql = postgres(`postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`, config)
  return sql
}
