import {Server} from 'http'
import setupSocket from 'services/socket/setup.socket'
import Player from 'models/game/player.model'
import PositionType from 'models/game/type/position.model'
import Team from 'models/game/team.model'
import Game from 'models/game/game.model'
import {Namespace, Socket} from 'socket.io'
import GameState from 'models/game/state/gameState.model'
import Timer from 'models/game/timer.model'

const game: Game = new Game()

game
  .addTeam(new Team('Golden State Warriors'))
  .addPlayer(new Player('Stephen', 'Curry', 30, PositionType.PG))
  .addPlayer(new Player('Klay', 'Thompson', 11, PositionType.SG))
  .addPlayer(new Player('Andrew', 'Wiggins', 22, PositionType.SF))
  .addPlayer(new Player('Draymond', 'Green', 23, PositionType.PF))
  .addPlayer(new Player('Kevon', 'Looney', 5, PositionType.C))
  .addPlayer(new Player('Chris', 'Paul', 3, PositionType.SG))
game
  .addTeam(new Team('Los Angeles Lakers'))
  .addPlayer(new Player(`D'Angelo`, 'Russell', 1, PositionType.PG))
  .addPlayer(new Player('Austin', 'Reaves', 15, PositionType.SG))
  .addPlayer(new Player('LeBron', 'James', 23, PositionType.SF))
  .addPlayer(new Player('Jarred', 'Vanderbilt', 2, PositionType.PF))
  .addPlayer(new Player('Anthony', 'Davis', 3, PositionType.C))
  .addPlayer(new Player('Rui', 'Hachimura', 28, PositionType.PF))

game.getTeams()[0].setStartingFive(30, 11, 22, 23, 5)
game.getTeams()[1].setStartingFive(1, 15, 23, 2, 3)

game.getState().setWarmingUp()
game.start()

export default (httpServer: Server): void => {
  try {
    const { admin } = setupSocket(httpServer)

    admin.on('connection', (socket: Socket): void => {
      socket.on('initialize_game', (): void => {
        socket.emit('update_status', game.getState().getData())
        socket.emit('update_quarter', game.getQuarter().getNumber())
        socket.emit('update_time', game.getQuarter().getTimer().getTime())
        game.getTeams().map((team: Team): void => {
          socket.emit('update_team', team.getData())
        })
      })

      socket.on('start_game', (): void => {
        const gameState: GameState = game.getState()

        if (!gameState.isWarmingUp() && !gameState.isStarting()) return

        gameState.setPlaying()
        game.getQuarter().getTimer().start(game)

        game.getTeams().map((team: Team): void => {
          team
            .getPlayers()
            .filter((player: Player) => player.getState().isStarting())
            .map((player: Player): void => {
              socket.emit('update_player_state', {
                team: team.getName(),
                number: player.getNumber(),
                state: player.getState().setPlaying()
              })
            })
        })

        socket.emit('update_status', gameState.getData())
        socket.emit('update_quarter', game.getQuarter().getNumber())

        updateTimer(game, admin)
      })

      socket.on('pause_game', (): void => {
        const gameState: GameState = game.getState()
        const timer: Timer = game.getQuarter().getTimer()

        if (!gameState.isStarting() && !gameState.isPaused() && !gameState.isPlaying()) return

        if (gameState.isPlaying()) {
          timer.stop()
          gameState.setPaused()

          socket.emit('update_time', timer.getTime())
          socket.emit('update_status', gameState.getData())

          return
        }

        timer.start(game)
        gameState.setPlaying()

        socket.emit('update_time', timer.getTime())
        socket.emit('update_status', gameState.getData())

        updateTimer(game, admin)
      })
    })
  } catch (error) {
    process.exit(0)
  }
}

function updateTimer(game: Game, admin: Namespace): void {
  admin.emit('update_time', game.getQuarter().getTimer().getTime())

  if (game.getQuarter().getTimer().getTime() === 0) {
    game.nextQuarter()
    game.getState().setPaused()
    return
  }

  const minutes: NodeJS.Timeout = setInterval((): void => {
    if (!game.getState().isPlaying()) return clearInterval(minutes)

    game.getTeams().map((team: Team): void => {
      team
        .getPlayers()
        .filter((player: Player) => player.getState().isPlaying())
        .map((player: Player): void => {
          admin.emit('update_player_statistics_seconds', {
            team: team.getName(),
            number: player.getNumber(),
            seconds: player.getStatistics().getSeconds(),
          })
        })
    })
  }, 30000)

  const seconds: NodeJS.Timeout = setInterval((): void => {
    if (!game.getState().isPlaying()) {
      clearInterval(minutes)
      clearInterval(seconds)
      return
    }

    admin.emit('update_time', game.getQuarter().getTimer().getTime())

    game.getTeams().map((team: Team): void => {
      team
        .getPlayers()
        .filter((player: Player) => player.getState().isPlaying())
        .map((player: Player): void => {
          player.getStatistics().addSeconds()
        })
    })
  }, 1000)
}
