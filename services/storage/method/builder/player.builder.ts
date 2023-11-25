export const players = (data: any): any => ({
	id: data.id,
	team_id: data.team_id,
	name: data.name,
	lastname: data.lastname,
	number: parseInt(data.number),
	height: parseInt(data.height),
	position: data.position,
	age: new Date().getFullYear() - new Date(data.birthday).getFullYear(),
	starter: data.starter
})

export const playersById = (data: any): any => ({
	team_id: data.team_id,
	name: data.name,
	lastname: data.lastname,
	number: parseInt(data.number),
	height: parseInt(data.height),
	position: data.position,
	age: new Date().getFullYear() - new Date(data.birthday).getFullYear(),
	starter: data.starter
})
