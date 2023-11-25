export default {
  arenasById: (data: any[], [id]): any[] =>
    data.filter((arena: any): boolean => arena.id === `${id}`),
  arenasByCityId: (data: any[], [id]): any[] =>
    data.filter((arena: any): boolean => arena.city_id === `${id}`),
  citiesById: (data: any[], [id]): any[] =>
    data.filter((city: any): boolean => city.id === `${id}`),
  citiesByName: (data: any[], [name]): any[] =>
    data.filter((city: any): boolean => city.name === `${name}`),
  playersById: (data: any[], [id]): any[] =>
    data.filter((player: any): boolean => player.id === `${id}`),
  playersByName: (data: any[], [name]): any[] =>
    data.filter((player: any): boolean => `${player.name} ${player.lastname}`.toLowerCase().includes(name.toLowerCase())),
  playersByTeamId: (data: any[], [id]): any[] =>
    data.filter((player: any): boolean => player.team_id === `${id}`),
  playersStatisticsByTeamId: (data: any[], [id]): any[] =>
    data.filter((player: any): boolean => player.team_id === `${id}`),
  playersStatisticsAvg: (data: any[]): any[] => data,
  playersStatisticsAvgById: (data: any[], [id]): any[] =>
    data.filter((playerStatistics: any): boolean => playerStatistics.player_id === `${id}`),
  playersStatisticsAvgPoints: (data: any[]): any[] => data,
  playersStatisticsAvgRebounds: (data: any[]): any[] => data,
  playersStatisticsAvgAssists: (data: any[]): any[] => data,
  staffByTeamId: (data: any[], [id]): any[] => data.filter((staff: any): boolean =>
    staff.team_id === `${id}`),
  teamsById: (data: any[], [id]): any[] =>
    data.filter((team: any): boolean => team.id === `${id}`),
  teamsByName: (data: any[], [name]): any[] =>
    data.filter((team: any): boolean => team.name.toLowerCase().includes(name.toLowerCase())),
  leaguesById: (data: any[], [id]): any[] =>
    data.filter((league: any): boolean => league.id === `${id}`),
  matchesById: (data: any[], [id]): any[] =>
    data.filter((match: any): boolean => match.id === id),
  matchesByClosest: (data: any[]): any[] =>
    data
      .filter((match: any): boolean => match.timestamp > new Date().toISOString())
      .sort((a: any, b: any) => new Date(a.timestamp).getMilliseconds() - new Date(b.timestamp).getMilliseconds())
      .splice(1),
  matchesByDate: (data: any[], [date]): any[] =>
    data.filter((match: any): boolean => date === new Date(match.datetime).toISOString().split('T')[0]),
  matchesAfterDate: (data: any[], [date]): any[] =>
    data.filter((match: any): boolean => new Date(date) < new Date(match.datetime)),
  matchesBeforeDate: (data: any[], [date]): any[] =>
    data.filter((match: any): boolean => new Date(date) > new Date(match.datetime)),
}
