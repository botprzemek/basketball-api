import { City, CityQuery } from 'models/api/city.model'

export const cities = (data: CityQuery): City => ({
	id: data.id,
	name: data.name,
	state: data.state
})
