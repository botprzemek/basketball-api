import cockroachStorage from 'services/storage/cockroach.storage'
import { CityQuery } from 'models/basketball/city.model'

export const cities = async (): Promise<CityQuery[]> =>
	cockroachStorage()`
		SELECT city.*
		FROM city 
		ORDER BY name ASC`

export const citiesById = async ([id]: number[]): Promise<CityQuery[]> =>
	cockroachStorage()`
		SELECT city.*
		FROM city 
		WHERE id = ${id}`

export const citiesByName = async ([name]: string[]): Promise<CityQuery[]> =>
	cockroachStorage()`
		SELECT city.*
		FROM city 
		WHERE name = ${name}`
