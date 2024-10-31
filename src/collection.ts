import { hasOwn, isArray, isObject } from './general'

export function mergeWith<TObject extends Record<string, any>, TSource extends Record<string, any>>(
  object: TObject,
  source: TSource,
  callback: (
    objValue: any,
    srcValue: any,
    key: string | number | symbol,
    object?: TObject,
    source?: TSource,
  ) => any | void,
): TObject & TSource {
  function baseMerge(target: any, src: any): any {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in src) {
      if (hasOwn(src, key)) {
        const srcValue = src[key]
        const targetValue = target[key]

        const customResult = callback(targetValue, srcValue, key, object, source)

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
