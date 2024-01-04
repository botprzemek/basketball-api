import * as dotenv from 'dotenv'
import * as postgres from 'postgres'
import {readFileSync as file} from 'fs'
import {resolve} from 'path'
import defaultConfig from 'configs/default.config'

dotenv.config()

const sslOptions = {
	ca: file(resolve('certificates/ca.crt')),
	cert: file(resolve('certificates/client.bp.crt')),
	key: file(resolve('certificates/client.bp.key'))
}

const ssl = defaultConfig.useSSL ? sslOptions : false

const config = {
	host: process.env.COCKROACH_HOST,
	port: Number(process.env.COCKROACH_PORT as string),
	database: process.env.COCKROACH_NAME,
	username: process.env.COCKROACH_USER,
	password: process.env.COCKROACH_PASSWORD,
	ssl: ssl,
	max: 20,
	idle_timeout: 30000,
	connection_timeout: 2000
}

let sql: postgres.Sql

export default (): postgres.Sql => {
	if (!sql)
		sql = postgres(
			`postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`,
			config
		)
	return sql
}
