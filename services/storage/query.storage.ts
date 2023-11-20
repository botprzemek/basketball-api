import cockroachStorage from 'services/storage/cockroach.storage'

export default {
  players: async (): Promise<any> => cockroachStorage()`SELECT player.* FROM player ORDER BY lastname ASC`,
  playersById: async (parameters: any): Promise<any> => cockroachStorage()`SELECT player.* FROM player WHERE id = ${parameters[0]}`,
  playersByName: async (parameters: any): Promise<any> => cockroachStorage()`SELECT player.* FROM player WHERE CONCAT(name, \' \', lastname) LIKE ${'%' + parameters[0] + '%'} ORDER BY lastname ASC`,
  playersByTeamId: async (parameters: any): Promise<any> => cockroachStorage()`SELECT player.* FROM player WHERE team_id = ${parameters[0]} ORDER BY starter DESC, lastname ASC`,
  playersByTeamName: async (parameters: any): Promise<any> => cockroachStorage()`SELECT player.* FROM player, team WHERE player.team_id = team.id AND team.name = ${parameters[0]} ORDER BY player.starter DESC, player.lastname ASC`,

  teams: async (): Promise<any> => cockroachStorage()`SELECT team.* FROM team`,
  teamsById: async (parameters: any): Promise<any> => cockroachStorage()`SELECT team.* FROM team WHERE id = ${parameters[0]}`,
  teamsByName: async (parameters: any): Promise<any> => cockroachStorage()`SELECT team.* FROM team WHERE name = ${parameters[0]}`,

  leagues: async (): Promise<any> => cockroachStorage()`SELECT league.* FROM league ORDER BY name ASC`,

  staff: async (): Promise<any> => cockroachStorage()`SELECT staff.* FROM staff ORDER BY lastname ASC`,
  staffByTeamId: async (parameters: any): Promise<any> => cockroachStorage()`SELECT staff.* FROM staff, team_staff WHERE staff.id = team_staff.staff_id AND team_staff.team_id = ${parameters[0]} ORDER BY staff.lastname ASC`,
  staffByTeamName: async (parameters: any): Promise<any> => cockroachStorage()`SELECT staff.* FROM staff, team_staff WHERE staff.id = team_staff.staff_id AND team_staff.team_name = ${parameters[0]} ORDER BY staff.lastname ASC`,
}