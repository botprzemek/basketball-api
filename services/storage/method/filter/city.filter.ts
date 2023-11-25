export const citiesById = (data: any[], [id]): any[] =>
	data.filter((city: any): boolean => city.id === `${id}`)

export const citiesByName = (data: any[], [name]): any[] =>
	data.filter((city: any): boolean => city.name === `${name}`)
