import { Server as Socket } from 'socket.io'
import * as http from 'http'

let server = null

const game: {
  pointsHost: number
  pointsOpponent: number
  time: number
  quarter: number
} = {
  pointsHost: 0,
  pointsOpponent: 0,
  time: 10,
  quarter: 1,
}

export default function setupSocket(httpServer: http.Server): void {
  if (!server) server = httpServer

  const io: Socket = new Socket(server)

  io.on('connection', (socket): void => {
    socket.emit('initialData', game)

    socket.on('updateScore', (data): void => {
      game.pointsHost += data.pointsHost
      game.pointsOpponent += data.pointsOpponent
      io.emit('updateGameData', game)
    })
  })

  const timer: NodeJS.Timeout = setInterval(() => {
    if (game.time > 0) {
      game.time--
      io.emit('updateGameData', game)
      return
    }
    if (game.quarter !== 4) {
      game.time = 10
      game.quarter++
      return
    }
    game.quarter = 0
    game.time = 0
    clearInterval(timer)
    io.emit('updateGameData', game)
  }, 100)
}
