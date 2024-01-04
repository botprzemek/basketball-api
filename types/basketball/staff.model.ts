import Role from 'types/basketball/enum/role.enum'

export interface StaffQuery {
	id: bigint
	team_id: bigint
	first_name: string
	last_name: string
	full_name: string
	role: string
}

export interface Staff {
	id: bigint
	name: string
	first_name: string
	last_name: string
	full_name: string
	role: Role
}
