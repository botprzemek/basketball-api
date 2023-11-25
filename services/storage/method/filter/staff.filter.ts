export const staffByTeamId = (data: any[], [id]): any[] =>
	data.filter((staff: any): boolean => staff.team_id === `${id}`)
