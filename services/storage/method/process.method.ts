import builderMethod from 'services/storage/method/builder.method'
import filterMethod from 'services/storage/method/filter.method'
import QueryEnum from 'types/storage/query.enum'

export default <QueryType>(
	data: QueryType[],
	key: string,
	query: QueryEnum,
	parameters: any[]
): QueryType[] => {
	if (!data) return []

	data =
		query && parameters && filterMethod[key] ? filterMethod[key](data, query, parameters) : data

	for (let i: number = 0; i < data.length; i++) data[i] = builderMethod[key](data[i])

	return data
}
