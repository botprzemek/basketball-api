export const arenas = (data: any): any => ({
	id: data.id,
	name: data.name,
	location: data.location
})

export const arenasById = (data: any): any => ({
	name: data.name,
	location: data.location
})

export const arenasByCityId = (data: any): any => ({
	id: data.id,
	name: data.name,
	location: data.location
})
