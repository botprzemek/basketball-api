import cockroachStorage from 'services/storage/cockroach.storage'
import {TransactionSql} from 'postgres'
import routes from 'utils/route.util'
import uniqueColumns from 'utils/uniqueColumns.util'


export default async (key: string, data: any): Promise<any[]> => {
	return cockroachStorage()
		.begin(
			(sql: TransactionSql): Promise<any[]> => sql<any[]>`
			INSERT INTO ${cockroachStorage()(routes[key])} ${cockroachStorage()([data])}
			ON CONFLICT (${cockroachStorage()(Object.keys(uniqueColumns[key]))}) DO NOTHING
			RETURNING *`
		)
		.catch((error) => {
			console.log(error)
			return []
		})
}