export interface ArenaQuery {
	readonly id: bigint
	readonly city_id: bigint
	readonly name: string
	readonly location: string
}

export interface Arena {
	id: bigint
	name: string
	location: string
}
