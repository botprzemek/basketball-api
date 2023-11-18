import {type Request, type Response} from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/sendData.util'
import {type PlayerFiltered} from 'models/query/data.model'

export function players(req: Request, res: Response): void {
  storage.players((data: PlayerFiltered[]): void => sendData(req, res, data))
}

export function playersById(req: Request, res: Response): void {
  storage.playersById(BigInt(req.params.id), (data: PlayerFiltered[]): void => sendData(req, res, data))
}

export function playersByName(req: Request, res: Response): void {
  storage.playersByName(req.params.name, (data: PlayerFiltered[]): void => sendData(req, res, data))
}

export function playersByTeamId(req: Request, res: Response): void {
  storage.playersByTeamId(BigInt(req.params.id), (data: PlayerFiltered[]): void => sendData(req, res, data))
}

export function playersByTeamName(req: Request, res: Response): void {
  storage.playersByTeamName(req.params.name, (data: PlayerFiltered[]): void => sendData(req, res, data))
}
