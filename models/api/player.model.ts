import Position from 'models/api/enum/position.enum'

export interface PlayerQuery {
	id: bigint
	team_id: bigint
	name: string
	lastname: string
	number: string
	height: string
	position: string
	birthday: string
	starter: boolean
}

export interface Player {
	id: bigint
	team_id: bigint
	name: string
	lastname: string
	number: number
	height: number
	position: Position
	age: number
	starter: boolean
}
