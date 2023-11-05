import Team from 'models/game/team.model'
import Player from 'models/game/player.model'
import PositionType from 'models/game/type/position.model'
import Game from 'models/game/game.model'
import FoulType from 'models/game/type/foul.model'

const data = {
  host: {
    name: 'Golden State Warriors',
    players: [
      {
        name: 'Stephen',
        lastname: 'Curry',
        number: 30,
        position: PositionType.PG,
        starting: true,
      },
    ],
  },
  opponent: {
    name: 'Los Angeles Lakers',
    players: [
      {
        name: 'LeBron',
        lastname: 'James',
        number: 23,
        position: PositionType.SF,
        starting: true,
      },
    ],
  },
}

const game: Game = new Game()

game
  .addHost(new Team('Golden State Warriors'))
  .addPlayer(new Player('Stephen', 'Curry', 30, PositionType.PG))

game
  .addOpponent(new Team('Los Angeles Lakers'))
  .addPlayer(new Player('LeBron', 'James', 23, PositionType.SF))

game
  .getState().setWarmingUp()

game
  .start()

game.getHost().setStartingFive(30)
game.getOpponent().setStartingFive(23)

setTimeout(() => {
  game.getHost().getStatistics()
    .addFoul(30, 23, FoulType.INSIDE_AND)
    .addFreethrow(true)

  game.getOpponent().getStatistics()
    .addInsideFG(23, true)

  console.dir(game.getData(), { depth: null })

  game.end()
}, 1)