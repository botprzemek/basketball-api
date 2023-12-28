import * as dotenv from 'dotenv'
import * as postgres from 'postgres'

dotenv.config()

const config = {
	host: process.env.COCKROACH_HOST,
	port: Number(process.env.COCKROACH_PORT as string),
	database: process.env.COCKROACH_NAME,
	username: process.env.COCKROACH_USER,
	password: process.env.COCKROACH_PASSWORD,
	max: 20,
	idle_timeout: 30000,
	connection_timeout: 2000,
	transform: postgres.toCamel
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
