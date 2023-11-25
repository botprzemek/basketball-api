export const teams = (data: any): any => ({
	id: data.id,
	city_id: data.city_id,
	league_id: data.league_id,
	name: data.name,
	won: parseInt(data.won),
	lost: parseInt(data.lost)
})
