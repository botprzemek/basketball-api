import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

let prisma: any

const assign = (): any => {
  prisma = new PrismaClient().$extends(withAccelerate())
  return prisma
}

export default (): any => {
  return prisma ? prisma : assign()
}
