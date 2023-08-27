export class Player {
    name
    lastname
    number
    height
    position

    constructor(player: PlayerType) {
        this.name = player.name ? player.name : 'Imię'
        this.lastname = player.lastname ? player.lastname : 'Nazwisko'
        this.number = player.number ? player.number : 99
        this.height = {
            cm: player.height ? player.height : 180
        }
        this.position = {
            index: player.position ? player.position : 0
        }
    }
}

export type PlayerType = {
    name: string,
    lastname: string,
    number: number,
    height: HeightType,
    position: PositionType
}

type HeightType = {
    cm: number,
    in: number
}

type PositionType = {
    index: number,
    short: string
}