interface PlayerQuery {
	id: bigint
	team_id: bigint
	name: string
	lastname: string
	number: string
	height: string
	position: string
	birthday: number
	starter: boolean
}

interface Player {
	id: bigint
	team_id: bigint
	name: string
	lastname: string
	number: number
	height: number
	position: string
	age: number
	starter: boolean
}