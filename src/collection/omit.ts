export function omit<T extends object, K extends keyof T>(object: T, keys: K[]): Omit<T, K> {
  const keysToOmit = new Set(keys)
  const result = {} as Omit<T, K>
  console.log(Object.keys(object))

  const ownKeys = [...Object.keys(object), ...Object.getOwnPropertySymbols(object)] as (keyof T)[]

  ownKeys.forEach((key) => {
    if (!keysToOmit.has(key as K)) {
      ;(result as T)[key] = object[key]
    }
  })

  return result
}
