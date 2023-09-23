import config from '../../configs/Default.config'
import { Server } from 'socket.io'
import * as http from 'http'
import Game from '../../public/Game'

let server = null

const game: Game = {
  status: false,
  paused: true,
  scoreHost: 0,
  scoreOpponent: 0,
  time: config.gameTime,
  quarter: 1,
}

const timers: NodeJS.Timeout[] = []

export default function setupSocket(httpServer: http.Server): void {
  if (!server) server = httpServer

  const io: Server = new Server(server, {
    cors: {
      origin: ['http://localhost:3000'],
    },
  })

  io.on('connection', (socket): void => {
    socket.emit('initialData', game)

    socket.on('updateScore', (data): void => {
      if (game.paused || !game.status) return
      game.scoreHost += parseInt(data.scoreHost)
      game.scoreOpponent += parseInt(data.scoreOpponent)
      io.emit('updateScore', {
        scoreHost: game.scoreHost,
        scoreOpponent: game.scoreOpponent,
      })
    })

    socket.on('changeStatus', (): void => {
      game.status ? resetGame() : startGame()
    })

    socket.on('pauseGame', (): void => {
      pauseGame()
    })

    const createTimer = (): NodeJS.Timeout => {
      const timer: NodeJS.Timeout = setInterval((): void => {
        if (game.time > 0) {
          game.time--
          io.emit('updateTimer', game)
          return
        }
        if (game.quarter !== 4) {
          game.time = config.gameTime
          game.quarter++
          io.emit('updateTimer', game)
          return
        }
        endGame()
      }, 1000)
      timers.push(timer)
      return timer
    }

    const startGame = (): void => {
      game.status = true
      game.paused = true
      game.scoreHost = 0
      game.scoreOpponent = 0
      game.time = config.gameTime
      game.quarter = 1
      if (!game.paused && timers.length === 0) createTimer()
      io.emit('updateData', game)
    }

    const endGame = (): void => {
      game.status = false
      game.paused = true
      game.time = 0
      game.quarter = 0
      io.emit('updateTimer', game)
      if (timers.length === 0) return
      clearInterval(timers.at(0))
      timers.length = 0
    }

    const resetGame = (): void => {
      if (!game.paused) return
      game.status = true
      game.paused = true
      game.scoreHost = 0
      game.scoreOpponent = 0
      game.time = config.gameTime
      game.quarter = 1
      io.emit('updateData', game)
      if (timers.length === 0) return
      clearInterval(timers.at(0))
      timers.length = 0
      startGame()
    }

    const pauseGame = (): void => {
      if (game.paused) {
        game.paused = false
        io.emit('updateTimer', game)
        createTimer()
        return
      }
      game.paused = true
      io.emit('updateTimer', game)
      clearInterval(timers.at(0))
      timers.length = 0
    }
  })
}
