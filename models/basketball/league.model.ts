export interface LeagueQuery {
	readonly id: bigint
	readonly arena_id: bigint
	readonly city_id: bigint
	readonly name: string
}

export interface League {
	id: bigint
	arena_id: bigint
	city_id: bigint
	name: string
}
