import {type Request, type Response} from 'express'
import sendData from 'utils/send.util'
import defaultConfig from 'configs/default.config'
import storage from 'services/storage.service'
import {Fund} from 'models/api/fund.model'

export async function getFundsByUrl(req: Request, res: Response): Promise<void> {
	const data: Fund[] = await storage('fund', 'fundByUrl', [defaultConfig.fund])
	sendData(req, res, data)
}
