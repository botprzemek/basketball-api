import { type Request, type Response } from 'express'
import sendData from 'utils/sendData.util'
import defaultConfig from 'configs/default.config'
import storage from 'services/storage.service'

export async function fund(req: Request, res: Response): Promise<void> {
  const data: any[] = await storage.fundByUrl(defaultConfig.fund)
  sendData(req, res, data)
}
