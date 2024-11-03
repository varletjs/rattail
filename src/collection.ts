import {
  hasOwn,
  isArray,
  isDate,
  isMap,
  isObject,
  isPlainObject,
  isSet,
  isWeakSet,
  toRawType,
  isArrayBuffer,
  isDataView,
  isRegExp,
  isTypedArray,
  isWeakMap,
} from './general'

export function mergeWith<TObject extends Record<string, any>, TSource extends Record<string, any>>(
  object: TObject,
  source: TSource,
  fn: (objValue: any, srcValue: any, key: string | number | symbol, object?: TObject, source?: TSource) => any,
): TObject & TSource {
  function baseMerge(target: any, src: any): any {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in src) {
      if (hasOwn(src, key)) {
        const srcValue = src[key]
        const targetValue = target[key]

        const customResult = fn(targetValue, srcValue, key, object, source)

        if (customResult !== undefined) {
          target[key] = customResult
        } else if (isObject(srcValue)) {
          if (isObject(targetValue)) {
            target[key] = baseMerge(targetValue, srcValue)
          } else {
            target[key] = baseMerge(isArray(srcValue) ? [] : {}, srcValue)
          }
        } else {
          target[key] = srcValue
        }
      }
    }
    return target
  }

  return baseMerge(object as any, source as any) as TObject & TSource
}

export function merge<TObject extends Record<string, any>, TSource extends Record<string, any>>(
  object: TObject,
  source: TSource,
) {
  return mergeWith(object, source, () => undefined)
}

export function cloneDeep<T>(value: T): T {
  return cloneDeepWith(value, () => undefined)
}

export function cloneDeepWith<T>(value: T, fn: (value: any) => any): T {
  const cache = new WeakMap()

  function baseCloneDeep(value: any, cache: WeakMap<any, any>): any {
    const customResult = fn(value)

    if (customResult !== undefined) {
      return customResult
    }

    if (!isObject(value)) {
      return value
    }

    if (cache.has(value)) {
      return cache.get(value)
    }

    if (isDate(value)) {
      return new Date(value)
    }

    if (isRegExp(value)) {
      return new RegExp(value)
    }

    if (isMap(value)) {
      const result = new Map()
      cache.set(value, result)

      value.forEach((val: any, key: any) => {
        result.set(baseCloneDeep(key, cache), baseCloneDeep(val, cache))
      })

      return result
    }

    if (isSet(value)) {
      const result = new Set()
      cache.set(value, result)

      value.forEach((val: any) => {
        result.add(baseCloneDeep(val, cache))
      })

      return result
    }

    if (toRawType(value) === 'String' || toRawType(value) === 'Number' || toRawType(value) === 'Boolean') {
      return newConstructor(value, value.valueOf())
    }

    if (isWeakMap(value) || isWeakSet(value)) {
      return {}
    }

    if (isTypedArray(value)) {
      return newConstructor(value, baseCloneArrayBuffer(value.buffer), value.byteOffset, value.length)
    }

    if (isDataView(value)) {
      return newConstructor(value, baseCloneArrayBuffer(value.buffer), value.byteOffset, value.byteLength)
    }

    if (isArrayBuffer(value)) {
      return baseCloneArrayBuffer(value)
    }

    if (isArray(value)) {
      const result: any[] = []
      cache.set(value, result)

      value.forEach((value, index) => {
        result[index] = baseCloneDeep(value, cache)
      })

      return result
    }

    if (isPlainObject(value)) {
      const result: Record<string, any> = Object.create(Reflect.getPrototypeOf(value))
      cache.set(value, result)

      // eslint-disable-next-line no-restricted-syntax
      for (const key in value) {
        if (hasOwn(value, key)) {
          result[key] = baseCloneDeep(value[key], cache)
        }
      }

      return result
    }

    return value
  }

  function baseCloneArrayBuffer(value: ArrayBuffer): ArrayBuffer {
    const result = new ArrayBuffer(value.byteLength)
    new Uint8Array(result).set(new Uint8Array(value))
    return result
  }

  function newConstructor(value: any, ...args: any[]) {
    return new value.constructor(...args)
  }

  return baseCloneDeep(value, cache)
}

export function pick<T, K extends keyof T>(object: T, keys: K[]) {
  return keys.reduce(
    (result, key) => {
      result[key] = object[key]
      return result
    },
    {} as Pick<T, K>,
  )
}

export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): { [K2 in Exclude<keyof T, K>]: T[K2] } {
  const keysToOmit = new Set(keys)
  const result = {} as { [K in keyof T]: T[K] }

  ;(Object.keys(obj) as (keyof T)[]).forEach((key) => {
    if (!keysToOmit.has(key as K)) {
      result[key] = obj[key]
    }
  })

  return result
}

export function pickBy<T extends object>(
  object: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean,
): Partial<T> {
  return Object.keys(object).reduce((result, key) => {
    const typedKey = key as keyof T
    if (predicate(object[typedKey], typedKey)) {
      result[typedKey] = object[typedKey]
    }
    return result
  }, {} as Partial<T>)
}

export function omitBy<T extends object>(
  object: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean,
): Partial<T> {
  return Object.keys(object).reduce((result, key) => {
    const typedKey = key as keyof T
    if (!predicate(object[typedKey], typedKey)) {
      result[typedKey] = object[typedKey]
    }
    return result
  }, {} as Partial<T>)
}
