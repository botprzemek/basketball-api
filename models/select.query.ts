import cockroachStorage from 'services/storage/cockroach.storage'
import QueryEnum from 'types/storage/query.enum'
import { TransactionSql } from 'postgres'
import { ArenaQuery } from 'types/basketball/arena.model'

export default async (table: string, query?: QueryEnum, parameter?: bigint): Promise<any[]> => {
	switch (query) {
		case QueryEnum.ID:
		case QueryEnum.CITY_ID: {
			return cockroachStorage()
				.begin(
					(sql: TransactionSql): Promise<ArenaQuery[]> => sql<ArenaQuery[]>`
					SELECT ${cockroachStorage()(table)}.*
					FROM ${cockroachStorage()(table)} 
					WHERE ${cockroachStorage()(query.toLowerCase())} = ${`${parameter}`}`
				)
				.catch(() => [])
		}
		case QueryEnum.NAME:
		case QueryEnum.TEAM_NAME:
		case QueryEnum.LOCATION: {
			return cockroachStorage()
				.begin(
					(sql: TransactionSql): Promise<ArenaQuery[]> => sql<ArenaQuery[]>`
					SELECT ${cockroachStorage()(table)}.*
					FROM ${cockroachStorage()(table)} 
					WHERE ${cockroachStorage()(query.toLowerCase())} ILIKE ${'%' + parameter + '%'}`
				)
				.catch(() => [])
		}
		default: {
			return cockroachStorage()
				.begin(
					(sql: TransactionSql): Promise<ArenaQuery[]> => sql<ArenaQuery[]>`
					SELECT ${cockroachStorage()(table)}.*
					FROM ${cockroachStorage()(table)}`
				)
				.catch(() => [])
		}
	}
}
