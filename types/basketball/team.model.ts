export interface TeamQuery {
	id: bigint
	city_id: bigint
	league_id: bigint
	name: string
	won: string
	lost: string
}

export interface Team {
	id: bigint
	league_id: bigint
	name: string
	won: number
	lost: number
}
