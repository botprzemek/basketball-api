export default {
  playersById: (data: any[], id: bigint): any[] => {
    return data.filter((player: any): boolean => {
      return player.id === `${id}`
    })
  },
  playersByName: (data: any[], name: string): any[] => {
    return data.filter((player: any): boolean => {
      return `${player.name} ${player.lastname}`.toLowerCase().includes(name.toLowerCase())
    })
  },
  playersByTeamId: (data: any[], id: bigint): any[] => {
    return data.filter((player: any): boolean => {
      return player.team_id === `${id}`
    })
  },
  playersStatisticsByTeamId: (data: any[], id: bigint): any[] => {
    return data.filter((player: any): boolean => {
      return player.team_id === `${id}`
    })
  },
  playersStatisticsTopPoints: (data: any[], _id: bigint): any[] => {
    return data
  },
  staffByTeamId: (data: any[], id: bigint): any[] => {
    return data.filter((staff: any): boolean => {
      return staff.team_id === `${id}`
    })
  },
  teamsById: (data: any[], id: bigint): any[] => {
    return data.filter((team: any): boolean => {
      return team.id === `${id}`
    })
  },
  teamsByName: (data: any[], name: string): any[] => {
    return data.filter((team: any): boolean => {
      return team.name.toLowerCase().includes(name.toLowerCase())
    })
  },
  leaguesById: (data: any[], id: bigint): any[] => {
    return data.filter((city: any): boolean => {
      return city.id === `${id}`
    })
  },
  citiesById: (data: any[], id: bigint): any[] => {
    return data.filter((city: any): boolean => {
      return city.id === `${id}`
    })
  },
  matchesByDate: (data: any[], date: string): any[] => {
    return data.filter((match: any): boolean => {
      const scheduleDate: string = new Date(match.schedule.datetime).toISOString().split('T')[0]
      return date === scheduleDate
    })
  },
  schedulesByDate: (data: any[], date: string): any[] => {
    return data.filter((schedule: any): boolean => {
      const scheduleDate: string = new Date(schedule.datetime).toISOString().split('T')[0]
      return date === scheduleDate
    })
  },
  schedulesAfterDate: (data: any[], date: string): any[] => {
    return data.filter((schedule: any): boolean => {
      const scheduleDate: Date = new Date(schedule.datetime)
      return new Date(date) < scheduleDate
    })
  },
  schedulesBeforeDate: (data: any[], date: string): any[] => {
    return data.filter((schedule: any): boolean => {
      const scheduleDate: Date = new Date(schedule.datetime)
      return new Date(date) > scheduleDate
    })
  },
}
