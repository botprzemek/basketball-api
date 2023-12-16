import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/send.util'
import { Team } from 'models/basketball/team.model'

export async function getTeams(req: Request, res: Response): Promise<void> {
	const data: Team[] = await storage('teams')
	sendData(req, res, data)
}

export async function getTeamsById(req: Request, res: Response): Promise<void> {
	const data: Team[] = await storage('teams', 'teamsById', [
		req.params.id ? BigInt(req.params.id) : 0
	])
	sendData(req, res, data)
}

export async function getTeamsByName(req: Request, res: Response): Promise<void> {
	const data: Team[] = await storage('teams', 'teamsByName', [req.params.name])
	sendData(req, res, data)
}

export async function getTeamsByCityId(req: Request, res: Response): Promise<void> {
	const data: Team[] = await storage('teams', 'teamsByCityId', [
		req.params.id ? BigInt(req.params.id) : 0
	])
	sendData(req, res, data)
}
