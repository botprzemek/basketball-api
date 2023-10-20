import {Namespace, Socket} from 'socket.io'
import {verify} from 'jsonwebtoken'

export default (namespaces: Namespace[]): void => {
  try {
    namespaces.forEach((namespace: Namespace): void => {
      namespace.use((socket: Socket, next): void => {
        const { token } = socket.handshake.auth
        if (!token) return

        verify(token, process.env.TOKEN_KEY as string, (error, verifiedToken): void => {
          if (error) return
          if (!verifiedToken || typeof verifiedToken !== 'object') return
          if (verifiedToken?.exp && Date.now() >= verifiedToken?.exp * 1000) return

          next()
        })
      })
    })
  } catch (error) {
    return
  }
}
