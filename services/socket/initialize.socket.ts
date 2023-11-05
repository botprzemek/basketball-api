import {Socket} from 'socket.io'
import {Server} from 'http'
import setupSocket from 'services/socket/setup.socket'
import Game from 'models/game/game.model'

export default (httpServer: Server): void => {
  try {
    const { admin, client } = setupSocket(httpServer)
    const game: Game = new Game()

    client.on('connection', (socket: Socket): void => {
      socket.emit('initialData', game.getData())
    })

    admin.on('connection', (socket: Socket): void => {
      socket.on('updateScore', (data: { scoreHost: number; scoreOpponent: number }): void => game.updateScore(client, data))
      socket.on('changeStatus', (): void => game.changeStatus(client))
      socket.on('pauseGame', (): void => game.pauseGame(client))
    })
  } catch (error) {
    process.exit(0)
  }
}
