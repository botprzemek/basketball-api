import cockroachStorage from 'services/storage/cockroach.storage'
import { TeamQuery } from 'models/api/team.model'

export const teams = async (): Promise<TeamQuery[]> =>
	cockroachStorage()`
		SELECT team.* 
		FROM team 
		ORDER BY name ASC`

export const teamsById = async (parameters: any[]): Promise<TeamQuery[]> =>
	cockroachStorage()`
		SELECT team.* 
		FROM team 
		WHERE id = ${parameters[0]}`

export const teamsByName = async (parameters: any[]): Promise<TeamQuery[]> =>
	cockroachStorage()`
		SELECT team.* 
		FROM team 
		WHERE name = ${parameters[0]}`

export const teamsByCityId = async (parameters: any[]): Promise<TeamQuery[]> =>
	cockroachStorage()`
		SELECT team.* 
		FROM team 
		WHERE city_id = ${parameters[0]}
		ORDER BY name ASC`
