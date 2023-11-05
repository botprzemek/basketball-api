const team = {
  score: [0, 0, 0, 0],
  timeouts: [0, 0, 0, 0],
  fouls: [0, 0, 0, 0],
  players: [],
}

export default {
  status: false,
  paused: true,
  time: 10 * 60,
  quarter: 0,
  host: team,
  opponent: team,
}
