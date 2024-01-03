import {getData, setData} from 'services/cache.service'

export default (route: string, key: string, data: any): void => {
	const cachedData: [] = getData(route)

	if (!cachedData) return

	setData(
		route,
		cachedData.filter(
			(cached: any) =>
				!data.some(
					(some: any): boolean => cached[key.toLowerCase()] === some[key.toLowerCase()]
				)
		)
	)
}
