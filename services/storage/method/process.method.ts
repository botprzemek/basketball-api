import builderMethod from 'services/storage/method/builder.method'
import filterMethod from 'services/storage/method/filter.method'
import QueryEnum from 'types/storage/query.enum'

export default <QueryType>(
	data: QueryType[],
	key: string,
	query?: QueryEnum,
	parameter?: any
): QueryType[] => {
	if (!data) return []

	data = query && parameter ? filterMethod(query, data, parameter) : data

	data.map((element: QueryType) => builderMethod(key, element))

	return data
}
