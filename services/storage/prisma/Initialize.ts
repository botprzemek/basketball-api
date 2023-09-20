import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import setupCache from 'services/storage/cache/Setup'

let prisma = null

export default () => {
  if (prisma) return prisma
  prisma = new PrismaClient().$extends(withAccelerate())
  try {
    prisma.schedule.findFirst()
  } catch (error) {
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] unable to connect to database (check your configuration)`)
    process.exit()
  } finally {
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] connected to database`)
    setupCache()
  }
  return prisma
}
