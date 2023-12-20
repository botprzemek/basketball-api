import cockroachStorage from 'services/storage/cockroach.storage'
import QueryEnum from 'types/storage/query.enum'

export default async (table: string, query?: QueryEnum, parameter?: bigint): Promise<any[]> => {
	switch (query) {
		case QueryEnum.ID:
		case QueryEnum.CITY_ID: {
			return cockroachStorage()`
				SELECT ${cockroachStorage()(table)}.*
				FROM ${cockroachStorage()(table)} 
				WHERE ${cockroachStorage()(query.toLowerCase())} = ${`${parameter}`}`
		}
		case QueryEnum.NAME:
		case QueryEnum.TEAM_NAME: {
			return cockroachStorage()`
				SELECT ${cockroachStorage()(table)}.*
				FROM ${cockroachStorage()(table)} 
				WHERE ${cockroachStorage()(query.toLowerCase())} ILIKE ${'%' + parameter + '%'}`
		}
		default: {
			return cockroachStorage()`
				SELECT ${cockroachStorage()(table)}.*
				FROM ${cockroachStorage()(table)}`
		}
	}
}
