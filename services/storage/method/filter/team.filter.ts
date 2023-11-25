export const teamsById = (data: any[], [id]): any[] =>
	data.filter((team: any): boolean => team.id === `${id}`)

export const teamsByName = (data: any[], [name]): any[] =>
	data.filter((team: any): boolean => team.name.toLowerCase().includes(name.toLowerCase()))
