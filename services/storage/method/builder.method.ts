import expressions from 'utils/expression.util'

export default (key: string, data: any): any => {
	if (!expressions[key]) return data
	const keys: string[] = Object.keys(expressions[key])
	const newData: { id: bigint; [key: string]: any } = {
		id: data.id
	}

	if (!keys.every((key: string) => Object.keys(data).includes(key))) return data

	keys.forEach((dataKey: string) => (newData[dataKey] = data[dataKey]))

	return newData
}
