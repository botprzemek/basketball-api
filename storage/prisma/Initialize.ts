import {PrismaClient} from '@prisma/client'
import {withAccelerate} from '@prisma/extension-accelerate'

let prisma = null

const initializePrisma = () => {
    prisma = new PrismaClient().$extends(withAccelerate())
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] connected to prisma database`)
    return prisma;
}

export default function () {
    return prisma
        ? prisma
        : initializePrisma()
}