import Position from 'types/basketball/enum/position.enum'

export interface PlayerQuery {
	id: bigint
	team_id: bigint
	first_name: string
	last_name: string
	full_name: string
	number: string
	height: string
	position: string
	birthday: string
	starter: boolean
}

export interface Player {
	id: bigint
	team_id: bigint
	first_name: string
	last_name: string
	full_name: string
	number: number
	height: number
	position: Position
	age: number
	starter: boolean
}
