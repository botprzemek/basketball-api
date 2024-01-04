import expressions from 'utils/expression.util'
import transform from 'utils/transform.util'

export default (key: string, data: any): any => {
	if (!expressions[key]) return data
	const keys: string[] = Object.keys(expressions[key])
	const newData: { id: bigint; [key: string]: any } = {
		id: data.id
	}

	if (keys.every((every: string): boolean => Object.keys(expressions[key]).includes(every)))
		keys.forEach((dataKey: string): void => (newData[dataKey] = data[dataKey]))

	return transform[key] ? transform[key](newData) : newData
}
