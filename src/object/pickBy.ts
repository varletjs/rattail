export function pickBy<T extends object>(object: T, fn: (value: any, key: keyof T) => any): Partial<T> {
  const ownKeys = [...Object.keys(object), ...Object.getOwnPropertySymbols(object)]

  return ownKeys.reduce((result, key) => {
    const value = object[key as keyof typeof object]

    if (fn(value, key as keyof T)) {
      result[key as keyof typeof result] = value
    }

    return result
  }, {} as Partial<T>)
}
