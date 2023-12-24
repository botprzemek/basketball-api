import cockroachStorage from 'services/storage/cockroach.storage'
import QueryEnum from 'types/storage/query.enum'
import { ArenaQuery } from 'types/basketball/arena.model'
import { TransactionSql } from 'postgres'

export default async (table: string, query?: QueryEnum, parameter?: string): Promise<any[]> => {
	switch (query) {
		case QueryEnum.ID:
		case QueryEnum.CITY_ID: {
			return cockroachStorage()
				.begin(
					(sql: TransactionSql): Promise<ArenaQuery[]> => sql<ArenaQuery[]>`
					DELETE FROM ${cockroachStorage()(table)} 
					WHERE ${cockroachStorage()(query.toLowerCase())} = ${`${BigInt(parameter as string)}`}
					RETURNING *`
				)
				.catch(() => [])
		}
		case QueryEnum.NAME:
		case QueryEnum.TEAM_NAME:
		case QueryEnum.LOCATION: {
			return cockroachStorage()
				.begin(
					(sql: TransactionSql): Promise<ArenaQuery[]> => sql<ArenaQuery[]>`
					DELETE FROM ${cockroachStorage()(table)} 
					WHERE ${cockroachStorage()(query.toLowerCase())} ILIKE ${'%' + parameter + '%'}
					RETURNING *`
				)
				.catch(() => [])
		}
		default: {
			return []
		}
	}
}
