import prisma from './Initialize'
import {Team, Player, Statistics, Match, Schedule} from '@prisma/client'
import apiConfig from 'api.config'

const cacheStrategy: {swr: number, ttl: number} = {
    swr: apiConfig.cacheTime * 2,
    ttl: apiConfig.cacheTime
}

const teams = async (): Promise<Team[]> => {
    try {
        return prisma().team.findMany({cacheStrategy})
    }
    catch (error) {
        return null
    }
}

const teamsByName = async (name): Promise<Team[]> => {
    try {
        return prisma().player.findMany({
            cacheStrategy,
            where: {
                name: {
                    equals: name
                }
            }
        })
    }
    catch (error) {
        return null
    }
}

const players = async (): Promise<Player[]> => {
    try {
        return prisma().player.findMany({cacheStrategy})
    }
    catch (error) {
        return null
    }
}


const playersByTeam = async (team): Promise<Player[]> => {
    try {
        return prisma().player.findMany({
            cacheStrategy,
            where: {
                team: {
                    name: {
                        equals: team
                    }
                }
            }
        })
    }
    catch (error) {
        return null
    }
}

const matches = async (): Promise<Match[]> => {
    try {
        return prisma().match.findMany({
            cacheStrategy,
            select: {
                schedule: {
                    select: {
                        city: true,
                        datetime: true,
                    }
                },
                score: {
                    select: {
                        host: true,
                        opponent: true
                    },
                },
                host: {
                    select: {
                        name: true
                    }
                },
                opponent: {
                    select: {
                        name: true
                    }
                }
            }
        })
    }
    catch (error) {
        return null
    }
}


const matchesByDate = async (date: string): Promise<Match[]> => {
    const yesterday: Date = new Date(date)
    const tomorrow: Date = new Date(date)
    yesterday.setDate(yesterday.getDate())
    tomorrow.setDate(tomorrow.getDate() + 1)
    try {
        return prisma().match.findMany({
            cacheStrategy,
            where: {
                schedule: {
                    datetime: {
                        gt: yesterday,
                        lt: tomorrow
                    }
                }
            },
            select: {
                schedule: {
                    select: {
                        city: true,
                        datetime: true,
                    }
                },
                score: {
                    select: {
                        host: true,
                        opponent: true
                    },
                },
                host: {
                    select: {
                        name: true
                    }
                },
                opponent: {
                    select: {
                        name: true
                    }
                }
            }
        })
    }
    catch (error) {
        return null
    }
}


const schedules = async (): Promise<Schedule[]> => {
    try {
        return prisma().schedule.findMany({
            cacheStrategy,
            select: {
                city: true,
                datetime: true,
                match: {
                    select: {
                        host: {
                            select: {
                                name: true
                            }
                        },
                        opponent: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })
    }
    catch (error) {
        return null
    }
}

export default {
    teams: () => teams(),
    teamsByName: (name: string) => teamsByName(name),
    players: () => players(),
    playersByTeam: (name: string) => playersByTeam(name),
    // playersByValue: (key: string, value: string | number, limit: number) => playersByValue(key, value, limit),
    matches: () => matches(),
    matchesByDate: (date: string) => matchesByDate(date),
    schedules: () => schedules()
}