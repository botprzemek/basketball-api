import {MatchFiltered, MatchSelect} from 'services/storage/prisma/QueryType'

const matchFilter = (data: MatchSelect[], method?: string, value?: any): MatchFiltered[] => {
    let filtered: MatchFiltered[] = []
    data.forEach((match: MatchSelect): void => {
        filtered.push({
            schedule: {
                city: match.schedule.city.name,
                datetime: match.schedule.datetime
            },
            score: {
                host: match.score !== null ? match.score.host : [],
                opponent: match.score !== null ? match.score.opponent : [],
                final: match.score !== null ? [ match.score.host.reduce((partialSum: number, a: number) => partialSum + a, 0), match.score.opponent.reduce((partialSum: number, a: number) => partialSum + a, 0) ] : []
            },
            host: match.host.name,
            opponent: match.opponent.name
        })
    })

    return (method) ? methods[method](filtered, value) : filtered
}

type Methods = {
    matchByDate: (data: MatchFiltered[], value: any) => MatchFiltered[],
}

const methods: Methods = {
    matchByDate: (data: MatchFiltered[], date: string): MatchFiltered[] => {
        return data.filter((match: MatchFiltered): boolean => {
            const scheduleDate: String = new Date(match.schedule.datetime).toISOString().split('T')[0]
            return date === scheduleDate
        })
    }
}

export default {
    methods,
    matchFilter: (data: MatchSelect[], method?: string, value?: any) => matchFilter(data, method, value)
}