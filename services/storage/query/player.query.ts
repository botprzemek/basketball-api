import cockroachStorage from 'services/storage/cockroach.storage'
import { PlayerQuery } from 'models/api/player.model'

export const players = async (): Promise<PlayerQuery[]> =>
	cockroachStorage()`
      SELECT player.* 
      FROM player 
      ORDER BY lastname ASC`
export const playersById = async ([id]): Promise<PlayerQuery[]> =>
	cockroachStorage()`
      SELECT player.* 
      FROM player 
      WHERE id = ${id}`
export const playersByName = async ([name]): Promise<PlayerQuery[]> =>
	cockroachStorage()`
      SELECT player.* 
      FROM player 
      WHERE CONCAT(name, \' \', lastname) 
      LIKE ${'%' + name + '%'} 
      ORDER BY lastname ASC`
export const playersByTeamId = async ([id]): Promise<PlayerQuery[]> =>
	cockroachStorage()`
      SELECT player.* 
      FROM player 
      WHERE team_id = ${id} 
      ORDER BY starter DESC, lastname ASC`
