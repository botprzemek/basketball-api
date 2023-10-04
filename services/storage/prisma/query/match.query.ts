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
          name: true,
        },
      },
      opponent: {
        select: {
          name: true,
        },
      },
    },
  }
}
