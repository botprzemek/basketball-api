import filterMethod from 'services/storage/method/filter.method'
import buildMethod from 'services/storage/method/builder.method'

export default <TypeQuery>(data: any, method?: string, parameters?: any[]): TypeQuery[] => {
	if (!data) return []

	data =
		method && parameters && filterMethod[method] ? filterMethod[method](data, parameters) : data

	return data.map((record: TypeQuery): TypeQuery[] =>
		method && buildMethod[method] ? buildMethod[method](record) : record
	)
}
