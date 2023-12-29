// const validParameters: string[] = ['page', 'per']
//
// const methods = {
//   sort: <QueryType>(key: any, data: QueryType[]): QueryType[] => data.sort((a: any, b: any): number => (a[key] && b[key]) ? a[key].localeCompare(b[key]) : 0)
// }
//
// export default <QueryType>(queries: { [method: string]: { key: string, data: string[] } }): QueryType[] => {
// 	Object.keys(queries).map((query: string): QueryType[] => methods[query](queries[query].key, queries[query].data))
// }