import builderMethod from 'services/storage/method/builder.method'
import filterMethod from 'services/storage/method/filter.method'
import QueryEnum from 'models/storage/query.enum'

export default <QueryType>(
	data: any,
	key: string,
	query?: QueryEnum,
	...parameters: any[]
): QueryType[] => {
	if (!data) return []

	data = query && parameters && filterMethod[key][query] ? filterMethod[key][query](data, parameters) : data

	for (let i: number = 0; i < data.length; i++) {
		data[i] =
			query && builderMethod[query]
				? builderMethod[query](data[i])
				: builderMethod[key](data[i])
	}

	return data
}
