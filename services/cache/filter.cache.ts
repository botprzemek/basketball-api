import { getData, setData } from 'services/cache.service'

export default <Route>(route: string, key: string, data: Route[]): void => {
	const cachedData: Route[] = getData(route)

	if (!cachedData) return

	setData(
		route,
		cachedData.filter(
			(cached: Route) =>
				!data.some(
					(some: Route): boolean => cached[key.toLowerCase()] === some[key.toLowerCase()]
				)
		)
	)
}
