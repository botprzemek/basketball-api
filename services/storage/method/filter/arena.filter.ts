export const arenasById = (data: any[], [id]): any[] =>
	data.filter((arena: any): boolean => arena.id === `${id}`)

export const arenasByCityId = (data: any[], [id]): any[] =>
	data.filter((arena: any): boolean => arena.city_id === `${id}`)
