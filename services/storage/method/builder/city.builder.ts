import { City, CityQuery } from 'models/basketball/city.model'

export const cities = (data: CityQuery): City => ({
	id: data.id,
	name: data.name,
	state: data.state
})
