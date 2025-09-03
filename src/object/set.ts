import { isNumber, isObject } from '../general'

export function set<T extends object | any[]>(object: T, path: (string | number)[], value: any) {
  if (!isObject(object)) {
    return
  }

  const keys = [...path]

  if (keys.length === 0) {
    return
  }

  let target = object as any

  while (keys.length > 1) {
    const key = keys.shift() as string | number
    const nextKey = keys[0]

    if (!isObject(target[key])) {
      target[key] = isNumber(nextKey) ? [] : {}
    }

    target = target[key]
  }

  target[keys[0]] = value
}
