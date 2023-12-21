import cockroachStorage from 'services/storage/cockroach.storage'
import { ArenaQuery } from 'types/basketball/arena.model'
import QueryEnum from 'types/storage/query.enum'
import { TransactionSql } from 'postgres'

export default async (query: QueryEnum, parameter: bigint, data: any): Promise<ArenaQuery[]> => {
	switch (query) {
		case QueryEnum.ID: {
			return cockroachStorage()
				.begin(
					(sql: TransactionSql) => sql<ArenaQuery[]>`
				UPDATE arena
				SET name = ${data.name}, location = ${data.location}
				WHERE id = ${parameter.toString()}
				RETURNING *`
				)
				.catch(() => [])
		}
		default: {
			return []
		}
	}
}
