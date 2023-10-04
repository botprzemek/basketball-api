import { TeamQuery } from 'models/query/team.query'

export default (_values?: any[]): TeamQuery => {
  return {
    where: {},
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
  }
}
