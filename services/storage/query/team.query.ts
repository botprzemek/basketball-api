import cockroachStorage from 'services/storage/cockroach.storage'
import { TeamQuery } from 'models/basketball/team.model'

export const teams = async (): Promise<TeamQuery[]> =>
	cockroachStorage()`
		SELECT team.* 
		FROM team 
		ORDER BY name ASC`

export const teamsById = async ([id]): Promise<TeamQuery[]> =>
	cockroachStorage()`
		SELECT team.* 
		FROM team 
		WHERE id = ${id}`

export const teamsByName = async ([name]): Promise<TeamQuery[]> =>
	cockroachStorage()`
		SELECT team.* 
		FROM team 
		WHERE name = ${name}`

export const teamsByCityId = async ([id]): Promise<TeamQuery[]> =>
	cockroachStorage()`
		SELECT team.* 
		FROM team 
		WHERE city_id = ${id}
		ORDER BY name ASC`
