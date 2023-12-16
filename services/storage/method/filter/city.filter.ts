import { CityQuery } from 'models/basketball/city.model'

export const citiesById = (data: CityQuery[], [id]): CityQuery[] =>
	data.filter((city: CityQuery): boolean => BigInt(city.id) === id)

export const citiesByName = (data: CityQuery[], [name]): CityQuery[] =>
	data.filter((city: CityQuery): boolean => city.name === name)
