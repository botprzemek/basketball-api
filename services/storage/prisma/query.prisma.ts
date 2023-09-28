import prisma from './prisma/initialize.prisma.storage'
import { type MatchSelected, type PlayerSelected, type TeamSelected } from 'models/query.model'
import config from 'config'

const cacheStrategy: { swr: number; ttl: number } = {
  swr: config.cacheTime * 2,
  ttl: config.cacheTime,
}

const players = async (): Promise<PlayerSelected[]> => {
  try {
    return (await prisma()).player.findMany({
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
    return []
  }
}

const playersByName = async (name: string): Promise<PlayerSelected[]> => {
  try {
    return (await prisma()).player.findMany({
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
    return []
  }
}

const playersByTeam = async (team: string): Promise<PlayerSelected[]> => {
  try {
    return (await prisma()).player.findMany({
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
    return []
  }
}

const teams = async (): Promise<TeamSelected[]> => {
  try {
    return (await prisma()).team.findMany({
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
    return []
  }
}

const teamsByName = async (name: string): Promise<TeamSelected[]> => {
  try {
    return await (
      await prisma()
    ).team.findFirst({
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
    return []
  }
}

const matches = async (): Promise<MatchSelected[]> => {
  try {
    return (await prisma()).match.findMany({
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
    return []
  }
}

const matchesByDate = async (date: string): Promise<MatchSelected[]> => {
  const yesterday: Date = new Date(date)
  const tomorrow: Date = new Date(date)
  yesterday.setDate(yesterday.getDate())
  tomorrow.setDate(tomorrow.getDate() + 1)
  try {
    return (await prisma()).match.findMany({
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
    return []
  }
}

// const schedules = async () => {
//   try {
//     return (await prisma()).schedule.findMany({
//       cacheStrategy,
//       select: {
//         city: true,
//         datetime: true,
//         match: {
//           select: {
//             host: {
//               select: {
//                 name: true,
//               },
//             },
//             opponent: {
//               select: {
//                 name: true,
//               },
//             },
//           },
//         },
//       },
//     })
//   } catch (error) {
//     return []
//   }
// }

export default {
  players: async (): Promise<PlayerSelected[]> => await players(),
  playersByName: async (name: string): Promise<PlayerSelected[]> => await playersByName(name),
  playersByTeam: async (name: string): Promise<PlayerSelected[]> => await playersByTeam(name),
  teams: async (): Promise<TeamSelected[]> => await teams(),
  teamsByName: async (name: string): Promise<TeamSelected[]> => await teamsByName(name),
  matches: async (): Promise<MatchSelected[]> => await matches(),
  matchesByDate: async (date: string): Promise<MatchSelected[]> => await matchesByDate(date),
}
