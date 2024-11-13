type Fn<T> = (val: T) => any

export function groupBy<T>(arr: T[], fn: Fn<T>): Record<string, T[]> {
  return arr.reduce(
    (result, item) => {
      const key = fn(item)
      result[key] = result[key] ?? []
      result[key].push(item)
      return result
    },
    {} as Record<string, T[]>,
  )
}
