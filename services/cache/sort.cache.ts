import { getData, setData } from 'services/storage/cache.storage'

export default <Route>(route: string, data: Route[]): void => {
	const cachedData: Route[] = getData(route)

	if (!cachedData) return

	cachedData.push(...(data as Route[]))
	cachedData.sort((a: any, b: any): number => a.name.localeCompare(b.name))
	setData(route, cachedData)
}
