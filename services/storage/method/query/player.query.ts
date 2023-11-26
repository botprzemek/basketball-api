import cockroachStorage from 'services/storage/cockroach.storage'
import { PlayerQuery } from 'models/api/player.model'

export const players = async (): Promise<PlayerQuery[]> =>
	cockroachStorage()`
      SELECT player.* 
      FROM player 
      ORDER BY lastname ASC`
export const playersById = async (parameters: any[]): Promise<PlayerQuery[]> =>
	cockroachStorage()`
      SELECT player.* 
      FROM player 
      WHERE id = ${parameters[0]}`
export const playersByName = async (parameters: any[]): Promise<PlayerQuery[]> =>
	cockroachStorage()`
      SELECT player.* 
      FROM player 
      WHERE CONCAT(name, \' \', lastname) 
      LIKE ${'%' + parameters[0] + '%'} 
      ORDER BY lastname ASC`
export const playersByTeamId = async (parameters: any[]): Promise<PlayerQuery[]> =>
	cockroachStorage()`
      SELECT player.* 
      FROM player 
      WHERE team_id = ${parameters[0]} 
      ORDER BY starter DESC, lastname ASC`
