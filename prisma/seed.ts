import { PrismaClient } from '@prisma/client'
import citySeedling from 'services/storage/prisma/seedlings/city.seedling'
import arenaSeedling from 'services/storage/prisma/seedlings/arena.seedling'
import leagueSeedling from 'services/storage/prisma/seedlings/league.seedling'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  await prisma.city.createMany({
    data: citySeedling,
    skipDuplicates: true,
  })
  await prisma.arena.createMany({
    data: arenaSeedling,
    skipDuplicates: true,
  })
  await prisma.league.create({
    data: leagueSeedling,
  })
}

//   await prisma.roster.create({
//     data: {
//       matchId: 2,
//       teamId: 2,
//       players: {
//         connect: [
//           { id: 16 },
//           { id: 17 },
//           { id: 18 },
//           { id: 19 },
//           { id: 20 },
//           { id: 21 },
//           { id: 22 },
//           { id: 23 },
//           { id: 24 },
//           { id: 25 },
//           { id: 26 },
//           { id: 27 },
//           { id: 28 },
//           { id: 29 },
//           { id: 30 },
//         ],
//       },
//     },
//   })
// }

main()
  .then(async (): Promise<void> => await prisma.$disconnect())
  .catch(async (error): Promise<void> => {
    await prisma.$disconnect()
    console.error(error)
    process.exit(1)
  })
