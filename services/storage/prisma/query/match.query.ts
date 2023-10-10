import { MatchQuery } from 'models/query/match.query'

export default (_values?: any[]): MatchQuery => {
  return {
    where: {},
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
          id: true,
          name: true,
        },
      },
      opponent: {
        select: {
          id: true,
          name: true,
        },
      },
      rosters: {
        include: {
          players: {
            select: {
              name: true,
              lastname: true,
              number: true,
            },
          },
        },
      },
    },
  }
}
