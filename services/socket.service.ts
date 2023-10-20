import {Socket} from 'socket.io'
import type * as http from 'http'
import setupSocket from 'services/socket/setup.socket'
import Game from 'models/game.model'

export const initializeSocket = (httpServer: http.Server): void => {
  try {
    const { admin, client } = setupSocket(httpServer)
    const game: Game = new Game()

    client.on('connection', (socket: Socket): void => {
      socket.emit('initialData', game.getData())
    })

    admin.on('connection', (socket: Socket): void => {
      socket.on('updateScore', (data): void => game.updateScore(client, data))
      socket.on('changeStatus', (): void => game.changeStatus(client))
      socket.on('pauseGame', (): void => game.pauseGame(client))
    })
  } catch (error) {
    process.exit(0)
  }
}
