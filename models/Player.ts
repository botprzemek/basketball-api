import { Player as _Player } from '@prisma/client'

export class Player {
  name: string
  lastname: string
  number: number
  height: { cm: number }
  position: { index: number }

  constructor(player: _Player) {
    this.name = player.name ? player.name : 'Imię'
    this.lastname = player.lastname ? player.lastname : 'Nazwisko'
    this.number = player.number ? player.number : 99
    this.height = {
      cm: player.height ? player.height : 180,
    }
    this.position = {
      index: player.position ? player.position : 0,
    }
  }
}
