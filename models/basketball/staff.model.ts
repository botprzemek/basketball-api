import Role from 'models/basketball/enum/role.enum'

export interface StaffQuery {
	id: bigint
	team_id: bigint
	name: string
	lastname: string
	role: string
}

export interface Staff {
	id: bigint
	name: string
	lastname: string
	role: Role
}
