export const playersById = (data: any[], [id]): any[] =>
	data.filter((player: any): boolean => player.id === `${id}`)

export const playersByName = (data: any[], [name]): any[] =>
	data.filter((player: any): boolean =>
		`${player.name} ${player.lastname}`.toLowerCase().includes(name.toLowerCase())
	)

export const playersByTeamId = (data: any[], [id]): any[] =>
	data.filter((player: any): boolean => player.team_id === `${id}`)
