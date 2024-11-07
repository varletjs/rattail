export function pickBy<T>(collection: T, fn: (value: any, key: keyof T) => boolean): Partial<T> | undefined {
  if (typeof collection === 'object' && collection !== null) {
    const allKeys = [...Object.keys(collection), ...Object.getOwnPropertySymbols(collection)] as (keyof T)[]
    return allKeys.reduce((result, key) => {
      const value = collection[key]
      if (fn(value, key)) {
        ;(result as Partial<T>)[key] = value
      }
      return result
    }, {} as Partial<T>)
  }
}
