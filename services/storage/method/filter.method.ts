export default {
  playersById: (data: any[], [id]): any[] => {
    return data.filter((player: any): boolean => {
      return player.id === `${id}`
    })
  },
  playersByName: (data: any[], [name]): any[] => {
    return data.filter((player: any): boolean => {
      return `${player.name} ${player.lastname}`.toLowerCase().includes(name.toLowerCase())
    })
  },
  playersByTeamId: (data: any[], [id]): any[] => {
    return data.filter((player: any): boolean => {
      return player.team_id === `${id}`
    })
  },
  playersStatisticsByTeamId: (data: any[], [id]): any[] => {
    return data.filter((player: any): boolean => {
      return player.team_id === `${id}`
    })
  },
  playersStatisticsAvg: (data: any[]): any[] => data,
  playersStatisticsAvgById: (data: any[], [id]): any[] => {
    return data.filter((playerStatistics: any): boolean => {
      return playerStatistics.player_id === `${id}`
    })
  },
  playersStatisticsAvgPoints: (data: any[]): any[] => data,
  playersStatisticsAvgRebounds: (data: any[]): any[] => data,
  playersStatisticsAvgAssists: (data: any[]): any[] => data,
  staffByTeamId: (data: any[], [id]): any[] => {
    return data.filter((staff: any): boolean => {
      return staff.team_id === `${id}`
    })
  },
  teamsById: (data: any[], [id]): any[] => {
    return data.filter((team: any): boolean => {
      return team.id === `${id}`
    })
  },
  teamsByName: (data: any[], [name]): any[] => {
    return data.filter((team: any): boolean => {
      return team.name.toLowerCase().includes(name.toLowerCase())
    })
  },
  leaguesById: (data: any[], [id]): any[] => {
    return data.filter((city: any): boolean => {
      return city.id === `${id}`
    })
  },
  citiesById: (data: any[], [id]): any[] => {
    return data.filter((city: any): boolean => {
      return city.id === `${id}`
    })
  },
  matchesByDate: (data: any[], [date]): any[] => {
    return data.filter((match: any): boolean => {
      const scheduleDate: string = new Date(match.schedule.datetime).toISOString().split('T')[0]
      return date === scheduleDate
    })
  },
  schedulesByDate: (data: any[], [date]): any[] => {
    return data.filter((schedule: any): boolean => {
      const scheduleDate: string = new Date(schedule.datetime).toISOString().split('T')[0]
      return date === scheduleDate
    })
  },
  schedulesAfterDate: (data: any[], [date]): any[] => {
    return data.filter((schedule: any): boolean => {
      const scheduleDate: Date = new Date(schedule.datetime)
      return new Date(date) < scheduleDate
    })
  },
  schedulesBeforeDate: (data: any[], [date]): any[] => {
    return data.filter((schedule: any): boolean => {
      const scheduleDate: Date = new Date(schedule.datetime)
      return new Date(date) > scheduleDate
    })
  },
}
