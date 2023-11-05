import http from 'http'
import { Namespace, Server } from 'socket.io'
import authorizeSocket from 'services/socket/authorize.socket'

export default (server: http.Server): { admin: Namespace; client: Namespace } => {
  const websocket: Server = new Server(server, {
    cors: {
      origin: JSON.parse(process.env.ADDRESSES as string),
    },
  })
  const admin: Namespace = websocket.of('admin')
  const client: Namespace = websocket.of('/')

  authorizeSocket([admin])

  return {
    admin: admin,
    client: client,
  }
}
