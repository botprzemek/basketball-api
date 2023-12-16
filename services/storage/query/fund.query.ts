import defaultConfig from 'configs/default.config'
import { FundQuery } from 'models/basketball/fund.model'

export const fund = async (): Promise<FundQuery[]> => [
	await fetch(defaultConfig.fund).then((response: Response): Promise<any> => response.json())
]

export const fundByUrl = async ([url]: string[]): Promise<FundQuery[]> => [
	await fetch(url).then((response: Response): Promise<any> => response.json())
]
