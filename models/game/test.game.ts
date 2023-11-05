import Team from 'models/game/team.model'
import Player from 'models/game/player.model'
import Position from 'models/game/position.model'
import Game from 'models/game/game.model'

const game: Game = new Game()

const team1: Team = new Team('Golden State Warriors', () => game)
const team2: Team = new Team('Los Angeles Lakers', () => game)

const player1: Player = new Player('Stephen', 'Curry', 30, Position.PG)
const player2: Player = new Player('LeBron', 'James', 23, Position.SF)

game
  .addTeam(team1)
  .addTeam(team2)

game
  .getState()
  .setWarmingUp()

team1
  .addPlayer(player1)

team2
  .addPlayer(player2)

game
  .setQuarter(1)
  .getState()
  .setPlaying()

team1
  .setStartingFive(player1)

game
  .nextQuarter()
  .nextQuarter()
  .nextQuarter()

team1
  .getScore()
  .addFreethrow(player1, true)
  .addFreethrow(player1, false)
  .addFreethrow(player1, true)

game
  .nextQuarter()
  .nextQuarter()
  .nextQuarter()

game
  .getQuarter()

console.dir(game.getData(), { depth: null })