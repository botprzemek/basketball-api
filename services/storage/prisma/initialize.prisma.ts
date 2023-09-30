import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import setupCache from 'services/storage/cache/setup.cache'

const prismaClientSingleton = (): any => {
  return new PrismaClient().$extends(withAccelerate())
}

let prisma: any

export default async (): Promise<any> => {
  if (prisma) return prisma
  prisma = prismaClientSingleton()
  try {
    await prisma.$queryRaw`SELECT * FROM leagues WHERE 1 = 0`
  } catch (error) {
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] unable to connect to database (check your configuration)`)
    process.exit(0)
  } finally {
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] connected to database`)
    setupCache().then((): void => {
      console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] pulled latest data to cache`)
    })
  }
  return prisma
}
