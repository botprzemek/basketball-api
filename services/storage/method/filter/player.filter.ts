import { PlayerQuery } from 'models/api/player.model'

export const playersById = (data: PlayerQuery[], [id]): PlayerQuery[] =>
	data.filter((player: PlayerQuery): boolean => BigInt(player.id) === id)

export const playersByName = (data: PlayerQuery[], [name]): PlayerQuery[] =>
	data.filter((player: PlayerQuery): boolean =>
		`${player.name} ${player.lastname}`.toLowerCase().includes(name.toLowerCase())
	)

export const playersByTeamId = (data: PlayerQuery[], [id]): PlayerQuery[] =>
	data.filter((player: PlayerQuery): boolean => BigInt(player.team_id) === id)
