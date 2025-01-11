import { at } from '../array'
import { hasOwn, isArray, isObject } from '../general'

type Fn = (objValue: any, srcValue: any, key: string | number | symbol, object?: any, source?: any) => any

export function mergeWith<T extends Record<string, any>, K extends Record<string, any>>(
  object: T,
  ...sources: [...K[], fn: Fn]
): T & K {
  const fn = at(sources, -1) as Fn
  const targets = [object, ...sources.slice(0, -1)] as (T & K)[]

  let len = targets.length - 1
  let result = targets[len]

  while (len) {
    result = baseMergeWith(targets[len - 1], result, fn)
    len--
  }

  function baseMergeWith<T extends Record<string, any>, K extends Record<string, any>>(
    object: T,
    source: K,
    fn: Fn,
  ): T & K {
    function baseMerge(target: any, src: any): any {
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

    return baseMerge(object as any, source as any) as T & K
  }

  return result
}
