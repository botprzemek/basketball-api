import { StaffQuery } from 'models/api/staff.model'

export const staffByTeamId = (data: StaffQuery[], [id]): StaffQuery[] =>
	data.filter((staff: StaffQuery): boolean => BigInt(staff.team_id) === id)
