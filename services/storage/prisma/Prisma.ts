import prisma from './Initialize'
import { MatchSelect, PlayerSelect, TeamSelect } from 'models/Query.model'
import config from '../../../configs/Default.config'

const cacheStrategy: { swr: number; ttl: number } = {
  swr: config.cacheTime * 2,
  ttl: config.cacheTime,
}

const teams = async (): Promise<TeamSelect[]> => {
  try {
    return prisma().team.findMany({
      cacheStrategy,
      select: {
        name: true,
        city: {
          select: {
            name: true,
          },
        },
        league: {
          select: {
            name: true,
          },
        },
        players: {
          select: {
            name: true,
            lastname: true,
            number: true,
            height: true,
            position: true,
            age: true,
          },
        },
      },
    })
  } catch (error) {
    return null
  }
}

const teamsByName = async (name: string): Promise<TeamSelect[]> => {
  try {
    return prisma().team.findFirst({
      cacheStrategy,
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
      select: {
        name: true,
        city: true,
        players: {
          select: {
            name: true,
            lastname: true,
            number: true,
            height: true,
            position: true,
            age: true,
          },
        },
      },
    })
  } catch (error) {
    return null
  }
}

const players = async (): Promise<PlayerSelect[]> => {
  try {
    return prisma().player.findMany({
      cacheStrategy,
      select: {
        name: true,
        lastname: true,
        number: true,
        height: true,
        position: true,
        age: true,
        team: {
          select: {
            league: {
              select: {
                name: true,
              },
            },
            name: true,
          },
        },
      },
    })
  } catch (error) {
    return null
  }
}

const playersByName = async (name: string): Promise<PlayerSelect[]> => {
  try {
    return prisma().player.findMany({
      cacheStrategy,
      where: {
        name: {
          startsWith: name,
          mode: 'insensitive',
        },
      },
      select: {
        name: true,
        lastname: true,
        number: true,
        height: true,
        position: true,
        age: true,
        team: {
          select: {
            league: {
              select: {
                name: true,
              },
            },
            name: true,
          },
        },
      },
    })
  } catch (error) {
    return null
  }
}

const playersByTeam = async (team: string): Promise<PlayerSelect[]> => {
  try {
    return prisma().player.findMany({
      cacheStrategy,
      where: {
        team: {
          name: {
            equals: team,
            mode: 'insensitive',
          },
        },
      },
      select: {
        name: true,
        lastname: true,
        number: true,
        height: true,
        position: true,
        age: true,
        team: {
          select: {
            league: {
              select: {
                name: true,
              },
            },
            name: true,
          },
        },
      },
    })
  } catch (error) {
    return null
  }
}

const matches = async (): Promise<MatchSelect[]> => {
  try {
    return prisma().match.findMany({
      cacheStrategy,
      select: {
        schedule: {
          select: {
            city: true,
            datetime: true,
          },
        },
        score: {
          select: {
            host: true,
            opponent: true,
          },
        },
        host: {
          select: {
            name: true,
          },
        },
        opponent: {
          select: {
            name: true,
          },
        },
      },
    })
  } catch (error) {
    return null
  }
}

const matchesByDate = async (date: string): Promise<MatchSelect[]> => {
  const yesterday: Date = new Date(date)
  const tomorrow: Date = new Date(date)
  yesterday.setDate(yesterday.getDate())
  tomorrow.setDate(tomorrow.getDate() + 1)
  try {
    return prisma().match.findMany({
      cacheStrategy,
      where: {
        schedule: {
          datetime: {
            gt: yesterday,
            lt: tomorrow,
          },
        },
      },
      select: {
        schedule: {
          select: {
            city: true,
            datetime: true,
          },
        },
        score: {
          select: {
            host: true,
            opponent: true,
          },
        },
        host: {
          select: {
            name: true,
          },
        },
        opponent: {
          select: {
            name: true,
          },
        },
      },
    })
  } catch (error) {
    return null
  }
}

const schedules = async () => {
  try {
    return prisma().schedule.findMany({
      cacheStrategy,
      select: {
        city: true,
        datetime: true,
        match: {
          select: {
            host: {
              select: {
                name: true,
              },
            },
            opponent: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })
  } catch (error) {
    return null
  }
}

export default {
  teams: () => teams(),
  teamsByName: (name: string) => teamsByName(name),
  players: () => players(),
  playersByName: (name: string) => playersByName(name),
  playersByTeam: (name: string) => playersByTeam(name),
  matches: () => matches(),
  matchesByDate: (date: string) => matchesByDate(date),
  schedules: () => schedules(),
}
