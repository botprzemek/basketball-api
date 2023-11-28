import builderMethod from 'services/storage/method/builder.method'
import filterMethod from 'services/storage/method/filter.method'

export default <TypeQuery>(data: any, method?: string, parameters?: any[]): TypeQuery[] => {
	if (!data) return []

	data =
		method && parameters && filterMethod[method] ? filterMethod[method](data, parameters) : data

	for (let i: number = 0; i < data.length; i++) {
		data[i] = method && builderMethod[method] ? builderMethod[method](data[i]) : data[i]
	}

	return data
}
