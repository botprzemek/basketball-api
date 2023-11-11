import Game from "models/game/game.model";

const data = {
  teams: [
    {
      mame: 'Golden State Warriors',
      players: [
        {
          name: 'Stephen',
          lastname: 'Curry',
          number: 30,
          position: 'PG',
        }
      ]
    },
    {
      mame: 'Los Angeles Lakers',
      players: [
        {
          name: `D'Angelo`,
          lastname: 'Russell',
          number: 1,
          position: 'PG',
        }
      ]
    }
  ]
}

const game: Game = new Game()

data.teams.forEach((team) => {
  team.
})