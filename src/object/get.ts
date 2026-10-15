import { hasOwn, isString } from '../general'

export function get<T = any>(object: any, path: string | (string | number)[], defaultValue?: T): T {
  const keys = isString(path) ? (object != null && hasOwn(Object(object), path) ? [path] : parsePath(path)) : path

  if (keys.length === 0) {
    return defaultValue as T
  }

  let value = object

  for (const key of keys) {
    if (value == null) {
      return defaultValue as T
    }

    value = value[key]
  }

  return value === undefined ? (defaultValue as T) : value
}

function parsePath(path: string) {
  return Array.from(
    path.matchAll(/[^.[\]]+|\[(?:(["'])(.*?)\1|([^\]]*))\]/g),
    ([match, quote, quotedKey, bracketKey]) => (quote ? quotedKey : (bracketKey ?? match)),
  )
}
