import { CityQuery } from 'models/api/city.model'

export const citiesById = (data: CityQuery[], [id]): CityQuery[] =>
	data.filter((city: CityQuery): boolean => city.id === id)

export const citiesByName = (data: CityQuery[], [name]): CityQuery[] =>
	data.filter((city: CityQuery): boolean => city.name === name)
