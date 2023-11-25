import { Server } from 'http'
import setupSocket from 'services/socket/setup.socket'
import Player from 'models/game/player.model'
import Team from 'models/game/team.model'
import Game from 'models/game/game.model'
import { Namespace, Socket } from 'socket.io'
import GameState from 'models/game/state/gameState.model'
import Timer from 'models/game/timer.model'
import game from 'models/game/data.game'

game.getState().setWarmingUp()

const test = (httpServer: Server): void => {
	try {
		const { admin } = setupSocket(httpServer)

		admin.on('connection', (socket: Socket): void => {
			socket.on('initialize_game', (): void => {
				socket.emit('update_state', game.getState().getData())
				socket.emit(
					'update_time',
					game.getQuarter() ? game.getQuarter().getTimer().getTime() : 0
				)
				game.getTeams().map((team: Team): void => {
					socket.emit('update_team', team.getData())
				})
			})

			socket.on('start_game', (): void => {
				const gameState: GameState = game.getState()

				if (!gameState.isWarmingUp()) return

				game.start()

				game.getTeams().map((team: Team): void => {
					team.setStartingFive()
					team.getPlayers().map((player: Player): void => {
						socket.emit('update_player_state', {
							team: team.getName(),
							number: player.getNumber(),
							state: player.getState().getData()
						})
					})
				})

				socket.emit('update_state', gameState.getData())
				socket.emit('update_quarter', game.getQuarter().getNumber())
			})

			socket.on('pause_game', (): void => {
				const gameState: GameState = game.getState()

				if (!gameState.isStarting() && !gameState.isPaused() && !gameState.isPlaying())
					return

				const timer: Timer = game.getQuarter().getTimer()

				if (gameState.isPlaying()) {
					clearInterval(timers.minutes[0])
					clearInterval(timers.seconds[0])

					timer.stop()
					gameState.setPaused()

					socket.emit('update_time', timer.getTime())
					socket.emit('update_state', gameState.getData())

					return
				}

				timer.start(game)
				gameState.setPlaying()

				socket.emit('update_state', gameState.getData())
				socket.emit('update_time', timer.getTime())

				game.getTeams().map((team: Team): void => {
					team.getPlayers().map((player: Player): void => {
						if (player.getState().isStarting()) player.getState().setPlaying()
						if (player.getState().isWarmingUp()) player.getState().setBenched()
						socket.emit('update_player_state', {
							team: team.getName(),
							number: player.getNumber(),
							state: player.getState().getData()
						})
					})
				})

				updateTimer(game, admin)
			})

			socket.on('substitution_team', (data): void => {
				if (!data) return

				const team: Team = game.getTeam(data.team)

				if (!team) return

				const substitute: Player = team.getPlayer(data.substitute)
				const changer: Player = team.getPlayer(data.changer)

				if (!substitute || !changer) return

				if (!team.substitution(substitute, changer)) return

				socket.emit('update_player_state', {
					team: team.getName(),
					number: substitute.getNumber(),
					state: substitute.getState().getData()
				})
				socket.emit('update_player_state', {
					team: team.getName(),
					number: changer.getNumber(),
					state: changer.getState().getData()
				})
			})
		})
	} catch (error) {
		process.exit(0)
	}
}

const timers: {
	minutes: NodeJS.Timeout[]
	seconds: NodeJS.Timeout[]
} = {
	minutes: [],
	seconds: []
}

const updateTimer = (game: Game, namespace: Namespace): void => {
	namespace.emit('update_time', game.getQuarter().getTimer().getTime())

	timers.minutes[0] = setInterval((): void => {
		game.getTeams().map((team: Team): void => {
			team.getPlayers()
				.filter((player: Player) => player.getState().isPlaying())
				.map((player: Player): void => {
					namespace.emit('update_player_statistics_seconds', {
						team: team.getName(),
						number: player.getNumber(),
						seconds: player.getStatistics().getSeconds()
					})
				})
		})
	}, 30000)

	timers.seconds[0] = setInterval((): void => {
		if (game.getQuarter().getTimer().getTime() === 0) {
			game.nextQuarter()

			namespace.emit('update_state', game.getState().getData())
			namespace.emit('update_quarter', game.getQuarter().getNumber())
			namespace.emit('update_time', game.getQuarter().getTimer().getTime())

			clearInterval(timers.minutes[0])
			clearInterval(timers.seconds[0])

			return
		}

		namespace.emit('update_time', game.getQuarter().getTimer().getTime())

		game.getTeams().map((team: Team): void => {
			team.getPlayers()
				.filter((player: Player) => player.getState().isPlaying())
				.map((player: Player): void => {
					player.getStatistics().addSeconds()
				})
		})
	}, 1000)
}

export default (httpServer: Server): void => {
	test(httpServer)
}
