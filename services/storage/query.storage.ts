import cockroachStorage from 'services/storage/cockroach.storage'

export default {
  players: async (): Promise<any> => cockroachStorage()`SELECT player.* FROM player ORDER BY lastname ASC`,
  playersById: async (parameters: any): Promise<any> => cockroachStorage()`SELECT player.* FROM player WHERE id = ${parameters[0]}`,
  playersByName: async (parameters: any): Promise<any> =>
    cockroachStorage()`SELECT player.* FROM player WHERE CONCAT(name, \' \', lastname) LIKE ${'%' + parameters[0] + '%'} ORDER BY lastname ASC`,
  playersByTeamId: async (parameters: any): Promise<any> =>
    cockroachStorage()`SELECT player.* FROM player WHERE team_id = ${parameters[0]} ORDER BY starter DESC, lastname ASC`,

  staff: async (): Promise<any> =>
    cockroachStorage()`SELECT staff.*, team_staff.team_id FROM staff, team_staff WHERE staff.id = team_staff.staff_id ORDER BY staff.lastname ASC`,
  staffByTeamId: async (parameters: any): Promise<any> =>
    cockroachStorage()`SELECT staff.*, team_staff.team_id FROM staff, team_staff WHERE staff.id = team_staff.staff_id AND team_staff.team_id = ${parameters[0]} ORDER BY staff.lastname ASC`,

  teams: async (): Promise<any> => cockroachStorage()`SELECT team.* FROM team ORDER BY name ASC`,
  teamsById: async (parameters: any): Promise<any> => cockroachStorage()`SELECT team.* FROM team WHERE id = ${parameters[0]}`,
  teamsByName: async (parameters: any): Promise<any> =>
    cockroachStorage()`SELECT team.* FROM team WHERE name LIKE ${'%' + parameters[0] + '%'} ORDER BY name ASC`,

  leagues: async (): Promise<any> => cockroachStorage()`SELECT league.* FROM league ORDER BY name ASC`,
  leaguesById: async (parameters: any[]): Promise<any> => cockroachStorage()`SELECT league.* FROM league WHERE id = ${parameters[0]}`,

  cities: async (): Promise<any> => cockroachStorage()`SELECT city.* FROM city ORDER BY name ASC`,
  citiesById: async (parameters: any[]): Promise<any> => cockroachStorage()`SELECT city.* FROM city WHERE id = ${parameters[0]}`,
}
