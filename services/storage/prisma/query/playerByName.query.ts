import { PlayerByNameQuery } from 'models/query/playerByName.query'

export default (values: any[]): PlayerByNameQuery => {
  return {
    where: {
      OR: [
        {
          name: {
            contains: values[0],
            mode: 'insensitive',
          },
        },
        {
          lastname: {
            contains: values[0],
            mode: 'insensitive',
          },
        },
      ],
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
  }
}
