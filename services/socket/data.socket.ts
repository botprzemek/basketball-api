import Game from 'models/game/game.model'
import Team from 'models/game/team.model'
import Player from 'models/game/player.model'
import Position from 'models/game/type/position.enum'
import storage from 'services/storage.service'
import Quarter from 'models/game/quarter.model'
import { PlayerQuery } from 'models/api/player.model'

const game: Game = new Game()

const setup = async (): Promise<void> => {
	const data: any = await storage('match', 'matchesByClosest', [])

	data['teams'].forEach((teamData: any): void => {
		const team: Team = new Team(teamData.name)

		game.addTeam(team)

		for (let i: number = 0; i < 4; i++) {
			game.addQuarter(new Quarter(i + 1, game.getTeams()[0], game.getTeams()[1]))
		}

		teamData.players.forEach((playerData: PlayerQuery): void => {
			const player: Player = new Player(
				playerData.name,
				playerData.lastname,
				playerData.number,
				playerData.position as Position,
				playerData.starter
			)
			team.addPlayer(player)
		})
	})
}

void setup()

export default game
