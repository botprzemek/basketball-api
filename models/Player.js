export class Player {
    name
    lastname
    number
    height
    position

    constructor(player) {
        this.name = (player.name) ? player.name : 'Imię'
        this.lastname = (player.lastname) ? player.lastname : 'Nazwisko'
        this.number = (player.number) ? player.number : 99
        this.height = (player.height) ? player.height : 182
        this.position = (player.position) ? player.position : 0
    }
}