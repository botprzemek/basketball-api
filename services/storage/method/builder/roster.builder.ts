import {Roster, RosterQuery} from 'models/api/roster.model'
import Position from 'models/api/enum/position.enum'

export const rosters = (data: RosterQuery): Roster => ({
	id: data.id,
	match_id: data.match_id,
	team_id: data.team_id,
	name: data.name,
	lastname: data.lastname,
	number: parseInt(data.number),
	height: parseInt(data.height),
	position: data.position as Position,
	age: new Date().getFullYear() - new Date(data.birthday).getFullYear(),
	starter: data.starter
})
