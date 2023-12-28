import { getData, setData } from 'services/cache.service'

export default (route: string, data: any): void => {
	const cachedData: { id: bigint; [key: string]: any }[] = getData(route)

	if (!cachedData) return

	cachedData.map((cached: { id: bigint; [key: string]: any }, index: number): void => {
		if (cached.id !== data.id) return
		cachedData[index] = data
	})

	cachedData.sort((a: any, b: any): number => {
		if (a.name && b.name) return a.name.localeCompare(b.name)
		return 0
	})

	setData(route, cachedData)
}
