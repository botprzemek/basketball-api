import { getData, setData } from 'services/cache.service'

export default <Route>(route: string, data: Route[]): void => {
	const cachedData: Route[] = getData(route)

	if (!cachedData) return

	cachedData.push(...(data as Route[]))

	cachedData.sort((a: any, b: any): number => {
		if (a.name && b.name) return a.name.localeCompare(b.name)
		return 0
	})

	setData(route, cachedData)
}
