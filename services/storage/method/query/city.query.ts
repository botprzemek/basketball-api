import cockroachStorage from 'services/storage/cockroach.storage'
import { CityQuery } from 'models/api/city.model'

export const cities = async (): Promise<CityQuery[]> =>
	cockroachStorage()`
		SELECT city.*
		FROM city 
		ORDER BY name ASC`

export const citiesById = async (parameters: any[]): Promise<CityQuery[]> =>
	cockroachStorage()`
		SELECT city.*
		FROM city 
		WHERE id = ${parameters[0]}`

export const citiesByName = async (parameters: any[]): Promise<CityQuery[]> =>
	cockroachStorage()`
		SELECT city.*
		FROM city 
		WHERE name = ${parameters[0]}`
