import { TeamByNameQuery } from 'models/query/teamByName.query'

export default (values: any[]): TeamByNameQuery => {
  return {
    where: {
      name: {
        equals: values[0],
        mode: 'insensitive',
      },
    },
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
