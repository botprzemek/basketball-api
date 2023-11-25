export const leaguesById = (data: any[], [id]): any[] =>
	data.filter((league: any): boolean => league.id === `${id}`)
