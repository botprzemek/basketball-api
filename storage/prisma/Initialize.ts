import {PrismaClient} from '@prisma/client'
import {withAccelerate} from '@prisma/extension-accelerate'
import setupCache from 'storage/cache/Setup'

let prisma = null

const initializePrisma = async (): Promise<PrismaClient> => {
    prisma = new PrismaClient().$extends(withAccelerate())
    try {
        await prisma.schedule.findFirst()
    }
    catch (error) {
        console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] unable to connect to prisma database (check your database configuration)`)
        process.exit()
    }
    finally {
        console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] connected to prisma database`)
        console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] created new storage cache`)
        setupCache()
    }
    return prisma
}

export default function () {
    return prisma
        ? prisma
        : initializePrisma()
}