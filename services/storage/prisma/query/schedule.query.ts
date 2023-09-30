interface ScheduleQuery {
  where: {}
  select: {
    city: boolean
    datetime: boolean
    match: {
      select: {
        host: {
          select: {
            name: boolean
          }
        }
        opponent: {
          select: {
            name: boolean
          }
        }
      }
    }
  }
}

export default (_values?: any[]): ScheduleQuery => {
  return {
    where: {},
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
  }
}
