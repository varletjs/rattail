export function omit<T extends object, K extends keyof T>(object: T, keys: K[]): Omit<T, K> {
  const ownKeys = [...Object.keys(object), ...Object.getOwnPropertySymbols(object)]

  return ownKeys.reduce(
    (result, key) => {
      if (!keys.includes(key as K)) {
        result[key as keyof typeof result] = object[key as keyof typeof result]
      }

      return result
    },
    {} as Omit<T, K>,
  )
}
