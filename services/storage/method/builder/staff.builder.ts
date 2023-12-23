import { Staff, StaffQuery } from 'types/basketball/staff.model'
import Role from 'types/basketball/enum/role.enum'

export default (data: StaffQuery): Staff => ({
	id: data.id,
	name: data.name,
	lastname: data.lastname,
	role: data.role as Role
})
