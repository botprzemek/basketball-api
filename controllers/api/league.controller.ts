import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/sendData.util'
import { LeagueFiltered } from 'models/query/league.model'

export function leagues(req: Request, res: Response): void {
  storage.leagues((data: LeagueFiltered[]): void => sendData(req, res, data))
}
