import { isFunction, isObject, toTypeString } from '../general'

export function sumHash(value: any): string {
  function sum(hash: number, value: string): number {
    for (let i = 0; i < value.length; i++) {
      const chr = value.charCodeAt(i)
      hash = (hash << 5) - hash + chr
      hash |= 0
    }

    return hash < 0 ? hash * -2 : hash
  }

  function baseSumHash(hash: number, value: any, key: string, seen: any[]): number {
    hash = sum(hash, key)
    hash = sum(hash, toTypeString(value))
    hash = sum(hash, typeof value)

    if (value === null) {
      return sum(hash, 'null')
    }

    if (value === undefined) {
      return sum(hash, 'undefined')
    }

    if (isObject(value) || isFunction(value)) {
      if (seen.includes(value)) {
        return sum(hash, `[Circular]${key}`)
      }

      seen.push(value)

      hash = Object.keys(value)
        .sort()
        .reduce((hash, key) => baseSumHash(hash, value[key], key, seen), hash)

      if (isFunction(value.valueOf)) {
        return sum(hash, String(value.valueOf()))
      }

      return hash
    }

    return sum(hash, value.toString())
  }

  return baseSumHash(0, value, '', []).toString(16).padStart(8, '0')
}
