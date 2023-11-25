import Player from 'models/game/player.model'
import PlayerStatistics from 'models/game/statistics/playerStatistics.model'
import FoulType from 'models/game/type/foul.model'
import TeamStatistics from 'models/game/statistics/teamStatistics.model'
import QuarterStatistics from 'models/game/statistics/quarterStatistics.model'
import Game from 'models/game/game.model'
import Team from 'models/game/team.model'
import Call from 'models/game/type/call.model'

export default class StatisticsManager {
	private readonly teamStatistics: TeamStatistics
	private call: Call
	private readonly team: Team
	private readonly game: Game

	constructor(team: Team, game: Game) {
		this.teamStatistics = new TeamStatistics()
		this.team = team
		this.game = game
	}

	addInsideFG(number: number, made: boolean): StatisticsManager {
		if (!this.game.getState().isPlaying()) return this

		const player: Player = this.team.getPlayer(number)

		if (!player) return this
		if (!player.getState().isPlaying()) return this

		const teamStatistics: TeamStatistics = this.teamStatistics
		const quarterStatistics: QuarterStatistics = this.game
			.getQuarter()
			.getQuarterStatistics(this.team)
		const playerStatistics: PlayerStatistics = player.getStatistics()

		quarterStatistics.addInsideFG(made)
		teamStatistics.addInsideFG(made)
		playerStatistics.addInsideFG(made)

		return this
	}

	public addFreethrow(made: boolean): StatisticsManager {
		if (!this.game.getState().isCall()) return this
		if (!this.call) return this

		const player: Player = this.call.getPlayer()
		const opponent: Player = this.call.getOpponent()

		if (!player) return this
		if (!player.getState().isFouled()) return this

		if (player.getState().getFreethrows() === 0) return this

		const teamStatistics: TeamStatistics = this.teamStatistics
		const quarterStatistics: QuarterStatistics = this.game
			.getQuarter()
			.getQuarterStatistics(this.team)
		const playerStatistics: PlayerStatistics = player.getStatistics()

		quarterStatistics.addFreethrow(made)
		teamStatistics.addFreethrow(made)
		playerStatistics.addFreethrow(made)

		player.getState().shotFreethrow()

		player.getState().setPlaying()

		if (opponent.getState().isFouledOn()) opponent.getState().setPlaying()
		this.game.getState().setPlaying()
		this.game.getQuarter().getTimer().start(this.game)

		return this
	}

	public addFoul(number: number, fouledBy: number, type: FoulType): StatisticsManager {
		if (!this.game.getState().isPlaying()) return this
		if (this.game.getState().isCall()) return this

		const player: Player = this.team.getPlayer(number)
		const opponent: Player = this.game.getOpposingTeam(this.team).getPlayer(fouledBy)

		if (!player || !opponent) return this
		if (!player.getState().isPlaying() || !opponent.getState().isPlaying()) return this

		this.call = new Call(player, opponent, type)

		const teamStatistics: TeamStatistics = this.teamStatistics
		const quarterStatistics: QuarterStatistics = this.game
			.getQuarter()
			.getQuarterStatistics(this.game.getOpposingTeam(this.team))
		const opponentStatistics: PlayerStatistics = opponent.getStatistics()

		quarterStatistics.addFoul()
		teamStatistics.addFoul()

		player.getState().setFouled(type)
		this.game.getState().setCall()

		if (opponentStatistics.addFoul().getFouls() === 5) {
			opponent.getState().setFouledOut()
			return this
		}

		opponent.getState().setFouledOn()
		return this
	}

	public getData() {
		return this.teamStatistics.getData()
	}
}
