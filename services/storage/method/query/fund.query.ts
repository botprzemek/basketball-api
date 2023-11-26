import defaultConfig from 'configs/default.config'
import { Fund, FundQuery } from 'models/api/fund.model'

export const fund = async (): Promise<FundQuery[]> => [
	await fetch(defaultConfig.fund).then((response: Response): Promise<any> => response.json())
]

export const fundByUrl = async (parameters: any[]): Promise<FundQuery[]> => [
	await fetch(parameters[0]).then((response: Response): Promise<any> => response.json())
]
