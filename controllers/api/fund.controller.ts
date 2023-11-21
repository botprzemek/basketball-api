import { type Request, type Response } from 'express'
import sendData from 'utils/sendData.util'
import defaultConfig from 'configs/default.config'

export async function fund(req: Request, res: Response): Promise<void> {
  const data: any = await fetch(defaultConfig.fund)
  sendData(req, res, await data.json())
}
