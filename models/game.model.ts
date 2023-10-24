import gameConfig from 'gameConfig'
import {Namespace} from 'socket.io'

interface GameData {
  status: boolean
  paused: boolean
  time: number
  quarter: number
  scoreHost: number
  scoreOpponent: number
}

export default class Game implements GameData {
  status: boolean
  paused: boolean
  time: number
  quarter: number
  scoreHost: number
  scoreOpponent: number
  private timers: NodeJS.Timeout[]

  constructor() {
    this.setToDefault()
  }

  setToDefault = (): void => {
    this.status = gameConfig.status
    this.paused = gameConfig.paused
    this.time = gameConfig.time
    this.quarter = gameConfig.quarter
    this.scoreHost = gameConfig.scoreHost
    this.scoreOpponent = gameConfig.scoreOpponent
    this.timers = []
  }

  getData = (): GameData => {
    return {
      status: this.status,
      paused: this.paused,
      time: this.time,
      quarter: this.quarter,
      scoreHost: this.scoreHost,
      scoreOpponent: this.scoreOpponent,
    }
  }

  createTimer = (client: Namespace): NodeJS.Timeout => {
    const timer: NodeJS.Timeout = setInterval((): void => {
      if (this.time > 0) {
        this.time--
        client.emit('updateTimer', {
          time: this.time,
        })
        return
      }
      if (this.quarter !== 4) {
        this.time = gameConfig.time
        this.quarter++
        this.pauseGame(client)
        client.emit('updateQuarter', {
          time: this.time,
          quarter: this.quarter,
        })
        return
      }
      this.endGame(client)
    }, 1000)
    this.timers.push(timer)
    return timer
  }

  startGame = (client: Namespace): void => {
    this.status = true
    this.paused = gameConfig.paused
    this.time = gameConfig.time
    this.quarter = 1
    this.scoreHost = gameConfig.scoreHost
    this.scoreOpponent = gameConfig.scoreOpponent
    if (this.status && !this.paused && this.timers.length === 0) this.createTimer(client)
    client.emit('updateData', this)
  }

  updateScore = (client: Namespace, data: any): void => {
    if (!this.status) return
    this.scoreHost += parseInt(data.scoreHost)
    this.scoreOpponent += parseInt(data.scoreOpponent)
    client.emit('updateScore', {
      scoreHost: this.scoreHost,
      scoreOpponent: this.scoreOpponent,
    })
  }

  pauseGame = (client: Namespace): void => {
    if (!this.status) return
    if (this.paused) {
      this.paused = false
      client.emit('pauseGame', {
        paused: this.paused,
      })
      this.createTimer(client)
      return
    }
    this.paused = true
    client.emit('pauseGame', {
      paused: this.paused,
    })
    this.timers.forEach((timer: NodeJS.Timeout) => clearInterval(timer))
    this.timers.length = 0
  }

  changeStatus = (client: Namespace): void => {
    if (!this.paused) return this.resetGame(client)
    this.status ? this.resetGame(client) : this.startGame(client)
  }

  resetGame = (client: Namespace): void => {
    if (this.time === gameConfig.time && this.quarter === 1) return
    if (!this.paused) return
    this.setToDefault()
    client.emit('updateData', this)
    if (this.timers.length === 0) return
    this.timers.forEach((timer: NodeJS.Timeout) => clearInterval(timer))
    this.timers.length = 0
    this.startGame(client)
  }

  endGame = (client: Namespace): void => {
    this.status = gameConfig.status
    this.paused = gameConfig.paused
    this.time = gameConfig.time
    this.quarter = gameConfig.quarter
    client.emit('updateTimer', {
      time: this.time,
    })
    if (this.timers.length === 0) return
    this.timers.forEach((timer: NodeJS.Timeout) => clearInterval(timer))
    this.timers.length = 0
  }
}
