import {
  type MatchFiltered,
  type MatchSelected,
  type PlayerFiltered,
  type PlayerSelected,
  type ScheduleFiltered,
  type ScheduleSelected,
  type TeamFiltered,
  type TeamSelected,
} from 'models/query/data.model'
import filterData from 'services/storage/method/filterData.method'
import buildData from 'services/storage/method/buildData.method'
import { LeagueFiltered, LeagueSelected } from 'models/query/league.model'

const typeFilter = (key: string, data: any, method?: string, value?: any): any[] => {
  if (!data) return []

  const filtered: any[] = []
  data = method ? filterData[method](data, value) : data

  data.forEach((record: any): void => {
    filtered.push(buildData[key](record))
  })

  return filtered
}

export default {
  typeFilter: (key: string, data: any, method?: string, value?: any): any[] => typeFilter(key, data, method, value),
  players: (data: PlayerSelected[], method?: string, value?: any): PlayerFiltered[] => typeFilter('players', data, method, value),
  teams: (data: TeamSelected[], method?: string, value?: any): TeamFiltered[] => typeFilter('teams', data, method, value),
  matches: (data: MatchSelected[], method?: string, value?: any): MatchFiltered[] => typeFilter('matches', data, method, value),
  schedules: (data: ScheduleSelected[], method?: string, value?: any): ScheduleFiltered[] => typeFilter('schedules', data, method, value),
  leagues: (data: LeagueSelected[], method?: string, value?: any): LeagueFiltered[] => typeFilter('leagues', data, method, value),
}