import cockroachStorage from 'services/storage/cockroach.storage'
import QueryEnum from 'models/storage/query.enum'

export default async (query: QueryEnum, ...params: any[]): Promise<boolean> => {
	switch (query) {
		case QueryEnum.ID: {
			const data = await cockroachStorage()`
				DELETE FROM arena 
				WHERE id = ${params.at(0)}`
			return data.length !== 0
		}
		case QueryEnum.CITY_ID: {
			const data = await cockroachStorage()`
				DELETE FROM arena 
				WHERE city_id = ${params.at(0)}`
			return data.length !== 0
		}
		default: {
			return false
		}
	}
}
