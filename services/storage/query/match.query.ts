import cockroachStorage from 'services/storage/cockroach.storage'
import { MatchQuery } from 'models/api/match.model'

export const matches = async (): Promise<MatchQuery[]> =>
	cockroachStorage()`
      SELECT match.*
      FROM match 
      ORDER BY timestamp ASC`

export const matchesById = async ([id]): Promise<MatchQuery[]> =>
	cockroachStorage()`
      SELECT match.*
      FROM match 
      WHERE id = ${id}`

export const matchesByClosest = async (): Promise<MatchQuery[]> =>
	cockroachStorage()`
      SELECT match.*
      FROM match 
      WHERE timestamp > CURRENT_TIMESTAMP
      ORDER BY timestamp ASC 
      LIMIT 1`

export const matchesByDate = async ([date]): Promise<MatchQuery[]> =>
	cockroachStorage()`
      SELECT match.*
      FROM match 
      WHERE timestamp LIKE ${date + '%'}`

// BETWEEN '2023-01-01 00:00:00' AND '2023-12-31 23:59:59'
export const matchesAfterDate = async ([date]): Promise<MatchQuery[]> =>
	cockroachStorage()`
      SELECT match.*
      FROM match 
      WHERE id = ${date}`

export const matchesBeforeDate = async ([date]): Promise<MatchQuery[]> =>
	cockroachStorage()`
      SELECT match.*
      FROM match 
      WHERE id = ${date}`
