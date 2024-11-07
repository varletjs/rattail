export function omitBy<T>(
  collection: T,
  fn: (value: T extends any[] ? T[number] : T[keyof T], key: number | keyof T) => boolean,
): Partial<T> | T[] | undefined {
  if (Array.isArray(collection)) {
    return collection.filter((value, index) => !fn(value as T extends any[] ? T[number] : T[keyof T], index))
  }

  if (typeof collection === 'object' && collection !== null) {
    const allKeys = [...Object.keys(collection), ...Object.getOwnPropertySymbols(collection)] as (keyof T)[]
    return allKeys.reduce((result, key) => {
      const value = collection[key]
      if (!fn(value as T extends any[] ? T[number] : T[keyof T], key)) {
        ;(result as Partial<T>)[key] = value
      }
      return result
    }, {} as Partial<T>)
  }
}
