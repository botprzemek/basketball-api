import { Staff, StaffQuery } from 'models/api/staff.model'
import Role from 'models/api/enum/role.enum'

export const staff = (data: StaffQuery): Staff => ({
	id: data.id,
	name: data.name,
	lastname: data.lastname,
	role: data.role as Role
})
