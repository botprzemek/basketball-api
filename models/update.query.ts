import cockroachStorage from 'services/storage/cockroach.storage'
import {ArenaQuery} from 'types/basketball/arena.model'
import QueryEnum from 'types/storage/query.enum'
import {TransactionSql} from 'postgres'
import routes from 'utils/route.util'
import expressions from "utils/expression.util";

export default async (
	key: string,
	query: QueryEnum,
	parameter: bigint,
	data: any
): Promise<any> =>
	cockroachStorage()
		.begin(
			(sql: TransactionSql) => sql<ArenaQuery[]>`
			UPDATE ${cockroachStorage()(routes[key])}
			SET ${cockroachStorage()(data, Object.keys(expressions[key]))}
			WHERE ${cockroachStorage()(query.toLowerCase())} = ${parameter.toString()}
		RETURNING *`
		)
		.catch((error) => {
			console.log(error)
			return []
		})
