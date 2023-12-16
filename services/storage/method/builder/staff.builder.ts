import { Staff, StaffQuery } from 'models/basketball/staff.model'
import Role from 'models/basketball/enum/role.enum'

export const staff = (data: StaffQuery): Staff => ({
	id: data.id,
	name: data.name,
	lastname: data.lastname,
	role: data.role as Role
})
