import filterMethod from 'services/storage/method/filter.method'
import buildMethod from 'services/storage/method/build.method'

export default (key: string, data: any, method?: string, parameters?: any[]): any[] => {
  if (!data) return []

  data = method && parameters ? filterMethod[method](data, parameters[0]) : data

  return data.map((record: any): any[] => buildMethod[key](record))
}
