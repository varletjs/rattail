type Fn<T, K> = (val: T) => K

export function groupBy<T, K extends PropertyKey>(arr: T[], fn: Fn<T, K>): Record<K, T[]> {
  return arr.reduce(
    (result, item) => {
      const key = fn(item)
      ;(result[key] ??= []).push(item)
      return result
    },
    {} as Record<K, T[]>,
  )
}
