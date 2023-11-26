import cockroachStorage from 'services/storage/cockroach.storage'
import { MatchQuery } from 'models/api/match.model'

export const matches = async (): Promise<MatchQuery[]> =>
	cockroachStorage()`
      SELECT match.*
      FROM match 
      ORDER BY timestamp ASC`

export const matchesById = async (parameters: any[]): Promise<MatchQuery[]> =>
	cockroachStorage()`
      SELECT match.*
      FROM match 
      WHERE id = ${parameters[0]}`

export const matchesByClosest = async (): Promise<MatchQuery[]> =>
	cockroachStorage()`
      SELECT match.*
      FROM match 
      WHERE timestamp > CURRENT_TIMESTAMP
      ORDER BY timestamp ASC 
      LIMIT 1`

export const matchesByDate = async (parameters: any[]): Promise<MatchQuery[]> =>
	cockroachStorage()`
      SELECT match.*
      FROM match 
      WHERE timestamp LIKE ${parameters[0] + '%'}`

// BETWEEN '2023-01-01 00:00:00' AND '2023-12-31 23:59:59'
export const matchesAfterDate = async (parameters: any[]): Promise<MatchQuery[]> =>
	cockroachStorage()`
      SELECT match.*
      FROM match 
      WHERE id = ${parameters[0]}`

export const matchesBeforeDate = async (parameters: any[]): Promise<MatchQuery[]> =>
	cockroachStorage()`
      SELECT match.*
      FROM match 
      WHERE id = ${parameters[0]}`
