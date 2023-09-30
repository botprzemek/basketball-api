interface PlayerByNameQuery {
  where: {
    OR: [
      {
        name: {
          contains: string
          mode: string
        }
      },
      {
        lastname: {
          contains: string
          mode: string
        }
      },
    ]
  }
  select: {
    name: boolean
    lastname: boolean
    number: boolean
    height: boolean
    position: boolean
    age: boolean
    team: {
      select: {
        league: {
          select: {
            name: boolean
          }
        }
        name: boolean
      }
    }
  }
}

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
