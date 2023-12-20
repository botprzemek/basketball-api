import { City, CityQuery } from 'types/basketball/city.model'

export default (data: CityQuery): City => ({
	id: data.id,
	name: data.name,
	state: data.state
})
