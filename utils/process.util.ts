import {
  type MatchFiltered,
  type MatchSelected,
  type PlayerFiltered,
  type PlayerSelected,
  type TeamFiltered,
  type TeamSelected,
} from 'models/query.model'
import filterUtil from 'utils/filter.util'
import builderUtil from 'utils/builder.util'

const typeFilter = (key: string, data: any, method?: string, value?: any): any[] => {
  if (!data) return []
  data = method ? filterUtil[method](data, value) : data
  const filtered: any[] = []

  data.forEach((record: any): void => {
    filtered.push(builderUtil[key](record))
  })

  return filtered
}

export default {
  typeFilter: (key: string, data: any, method?: string, value?: any): any[] => typeFilter(key, data, method, value),
  players: (data: PlayerSelected[], method?: string, value?: any): PlayerFiltered[] => typeFilter('players', data, method, value),
  teams: (data: TeamSelected[], method?: string, value?: any): TeamFiltered[] => typeFilter('teams', data, method, value),
  matches: (data: MatchSelected[], method?: string, value?: any): MatchFiltered[] => typeFilter('matches', data, method, value),
}
