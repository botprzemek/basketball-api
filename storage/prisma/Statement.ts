import prisma from './Initialize'

const queryPlayers = async () => {
    try {
        return {
            data: await prisma().player.findMany({
                cacheStrategy: {
                    swr: 60,
                    ttl: 60
                }
            }),
            error: null
        }
    }
    catch (error) {
        return {
            data: null,
            error: {
                code: 0,
                message: error.name
            }
        }
    }
}

const queryPlayersBy = async (key, value) => {
    const where = {}
    where[key] = value
    try {
        return {
            data: await prisma().player.findUnique({
                where: where,
                cacheStrategy: {
                    swr: 60,
                    ttl: 60
                }
            }),
            error: null,
        }
    }
    catch (error) {
        return {
            data: null,
            error: {
                code: 0,
                message: error.name
            }
        }
    }
}

export default {
    players: () => queryPlayers(),
    playersBy: (key, value) => queryPlayersBy(key, value)
}