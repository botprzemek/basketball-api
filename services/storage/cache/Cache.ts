import cache from './Initialize'

const setData = (key: string, value: any): any => {
  cache().set(key, value)
  return value
}

const getData = (key: string): any => {
  return cache().get(key)
}

export default {
  setData: (key: string, value: any) => setData(key, value),
  getData: (key: string) => getData(key),
  cache: () => cache(),
}
