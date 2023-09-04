import prisma from './Initialize'
import { MatchSelect } from 'models/Query'
import config from 'Config'

const cacheStrategy: { swr: number; ttl: number } = {
  swr: config.cacheTime * 2,
  ttl: config.cacheTime,
}

const teams = async () => {
  try {
    return prisma().team.findMany({ cacheStrategy })
  } catch (error) {
    return null
  }
}

const teamsByName = async (name) => {
  try {
    return prisma().player.findMany({
      cacheStrategy,
      where: {
        name: {
          equals: name,
        },
      },
    })
  } catch (error) {
    return null
  }
}

const players = async () => {
  try {
    return prisma().player.findMany({ cacheStrategy })
  } catch (error) {
    return null
  }
}

const playersByTeam = async (team) => {
  try {
    return prisma().player.findMany({
      cacheStrategy,
      where: {
        team: {
          name: {
            equals: team,
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
  playersByTeam: (name: string) => playersByTeam(name),
  // playersByValue: (key: string, value: string | number, limit: number) => playersByValue(key, value, limit),
  matches: () => matches(),
  matchesByDate: (date: string) => matchesByDate(date),
  schedules: () => schedules(),
}
