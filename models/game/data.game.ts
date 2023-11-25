import Game from 'models/game/game.model'
import Team from 'models/game/team.model'
import Player from 'models/game/player.model'
import PositionType from 'models/game/type/position.model'
import storage from 'services/storage.service'
import Quarter from 'models/game/quarter.model'

const game: Game = new Game()

const data: any = storage.matchesByClosest()

data['teams'].forEach((teamData): void => {
  const team: Team = new Team(teamData.name)

  game.addTeam(team)

  for (let i: number = 0; i < 4; i++) {
    game.addQuarter(new Quarter(i + 1, game.getTeams()[0], game.getTeams()[1]))
  }

  teamData.players.forEach((playerData): void => {
    const player: Player = new Player(playerData.name, playerData.lastname, playerData.number, PositionType[playerData.position], playerData.starter)
    team.addPlayer(player)
  })
})

export default game
