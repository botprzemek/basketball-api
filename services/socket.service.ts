import gameConfig from 'gameConfig'
import { Namespace, Server, Socket } from 'socket.io'
import type * as http from 'http'
import type Game from 'models/game.model'
import { verify as verifyToken } from 'jsonwebtoken'

let server: http.Server

const game: Game = {
  status: false,
  paused: true,
  scoreHost: 0,
  scoreOpponent: 0,
  time: gameConfig.time,
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

  const admin: Namespace = io.of('/admin')
  const client: Namespace = io.of('')

  admin.use((socket: Socket, next): void => {
    try {
      const { email, token } = socket.handshake.auth
      const verifiedToken = verifyToken(token, process.env.TOKEN_KEY as string)
      if (email !== (<any>verifiedToken).email) return
      next()
    } catch (error) {
      return
    }
  })

  client.on('connection', (socket): void => {
    socket.emit('initialData', game)
  })

  admin.on('connection', (socket): void => {
    socket.on('updateScore', (data): void => {
      if (game.paused || !game.status) return
      game.scoreHost += parseInt(data.scoreHost)
      game.scoreOpponent += parseInt(data.scoreOpponent)
      client.emit('updateScore', {
        scoreHost: game.scoreHost,
        scoreOpponent: game.scoreOpponent,
      })
    })

    socket.on('changeStatus', (): void => {
      if (!game.paused) return resetGame(game)
      game.status ? resetGame(game) : startGame(game)
    })

    socket.on('pauseGame', (): void => {
      if (!game.status) return
      pauseGame(game)
    })

    const createTimer = (game: Game): NodeJS.Timeout => {
      const timer: NodeJS.Timeout = setInterval((): void => {
        if (game.time > 0) {
          game.time--
          client.emit('updateTimer', {
            time: game.time,
          })
          return
        }
        if (game.quarter !== 4) {
          game.time = gameConfig.time
          game.quarter++
          pauseGame(game)
          client.emit('updateQuarter', {
            time: game.time,
            quarter: game.quarter,
          })
          return
        }
        endGame(game)
      }, 1000)
      timers.push(timer)
      return timer
    }

    const startGame = (game: Game): void => {
      game.status = true
      game.paused = true
      game.scoreHost = 0
      game.scoreOpponent = 0
      game.time = gameConfig.time
      game.quarter = 1
      if (game.status && !game.paused && timers.length === 0) createTimer(game)
      client.emit('updateData', game)
    }

    const endGame = (game: Game): void => {
      game.status = false
      game.paused = true
      game.time = 0
      game.quarter = 0
      client.emit('updateTimer', {
        time: game.time,
      })
      if (timers.length === 0) return
      clearInterval(timers.at(0))
      timers.length = 0
    }

    const resetGame = (game: Game): void => {
      if (game.time === gameConfig.time && game.quarter === 1) return
      if (!game.paused) return
      game.status = false
      game.paused = true
      game.scoreHost = 0
      game.scoreOpponent = 0
      game.time = gameConfig.time
      game.quarter = 1
      client.emit('updateData', game)
      if (timers.length === 0) return
      clearInterval(timers.at(0))
      timers.length = 0
      startGame(game)
    }

    const pauseGame = (game: Game): void => {
      if (game.paused) {
        game.paused = false
        client.emit('pauseGame', {
          paused: game.paused,
        })
        createTimer(game)
        return
      }
      game.paused = true
      client.emit('pauseGame', {
        paused: game.paused,
      })
      clearInterval(timers.at(0))
      timers.length = 0
    }
  })
}
