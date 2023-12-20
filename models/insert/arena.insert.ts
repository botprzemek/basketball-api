import cockroachStorage from 'services/storage/cockroach.storage'
import { ArenaQuery } from 'types/basketball/arena.model'
import { TransactionSql } from 'postgres'

export default async (data: any): Promise<ArenaQuery[]> =>
	cockroachStorage()
		.begin(
			(sql: TransactionSql): Promise<ArenaQuery[]> => sql<ArenaQuery[]>`
		INSERT INTO arena (city_id, name, location) 
		VALUES (${data.city_id}, ${data.name}, ${data.location}) 
		ON CONFLICT (name, location) DO NOTHING
		RETURNING *`
		)
		.catch(() => [])
