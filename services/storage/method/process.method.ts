import filterMethod from 'services/storage/method/filter.method'
import buildMethod from 'services/storage/method/build.method'

export default (data: any, method?: string, parameters?: any[]): any[] => {
  if (!data) return []

  data = method && parameters && filterMethod[method] ? filterMethod[method](data, parameters) : data

  return data.map((record: any): any[] => (method && buildMethod[method] ? buildMethod[method](record) : record))
}
