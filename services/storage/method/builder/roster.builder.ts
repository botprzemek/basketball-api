import { Roster, RosterQuery } from 'types/basketball/roster.model'
import { Player, PlayerQuery } from 'types/basketball/player.model'
import Position from 'types/basketball/enum/position.enum'

export default (data: RosterQuery & PlayerQuery): Roster & Player => ({
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
