import builderMethod from 'services/storage/method/builder.method'
import filterMethod from 'services/storage/method/filter.method'
import QueryEnum from 'types/storage/query.enum'

export default (data: any[], key: string, query?: QueryEnum, parameter?: string): any[] => {
	if (!data) return []

	if (parameter == 'undefined') return []

	data = query && parameter ? filterMethod(query, data, parameter) : data

	return data.map((element: any): any[] => builderMethod(key, element))
}
