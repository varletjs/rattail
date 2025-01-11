import { isArray } from './isArray'
import { isArrayBuffer } from './isArrayBuffer'
import { isDataView } from './isDataView'
import { isDate } from './isDate'
import { isDOMException } from './isDOMException'
import { isError } from './isError'
import { isMap } from './isMap'
import { isObject } from './isObject'
import { isPlainObject } from './isPlainObject'
import { isRegExp } from './isRegExp'
import { isSet } from './isSet'
import { isTypedArray } from './isTypedArray'
import { toRawType } from './toRawType'

export function isEqualWith(value: any, other: any, fn: (value: any, other: any) => any): boolean {
  const valueStack = new WeakMap()
  const otherStack = new WeakMap()

  function baseIsEqual(value: any, other: any, valueStack: WeakMap<any, any>, otherStack: WeakMap<any, any>): boolean {
    const customEqual = fn(value, other)

    if (customEqual === true) {
      return true
    }

    if (value === other) {
      return true
    }

    if (value !== value && other !== other) {
      return true
    }

    if (!isObject(value) || !isObject(other)) {
      return value === other
    }

    if (value.constructor !== other.constructor) {
      return false
    }

    if (
      (toRawType(value) === 'String' && toRawType(other) === 'String') ||
      (toRawType(value) === 'Number' && toRawType(other) === 'Number') ||
      (toRawType(value) === 'Boolean' && toRawType(other) === 'Boolean') ||
      (toRawType(value) === 'BigInt' && toRawType(other) === 'BigInt') ||
      (toRawType(value) === 'Symbol' && toRawType(other) === 'Symbol')
    ) {
      return value.valueOf() === other.valueOf()
    }

    if (isDate(value) && isDate(other)) {
      return value.getTime() === other.getTime()
    }

    if (isRegExp(value) && isRegExp(other)) {
      return value.source === other.source && value.flags === other.flags
    }

    if (isError(value) && isError(other)) {
      return value.name === other.name && value.message === other.message && value.cause === other.cause
    }

    if (isDOMException(value) && isDOMException(other)) {
      return value.name === other.name && value.message === other.message
    }

    if ((isTypedArray(value) && isTypedArray(other)) || (isDataView(value) && isDataView(other))) {
      if (value.byteLength !== other.byteLength) {
        return false
      }

      const valueTypedArray = new Uint8Array(value.buffer)
      const otherTypedArray = new Uint8Array(other.buffer)

      return valueTypedArray.every((v, i) => v === otherTypedArray[i])
    }

    if (isArrayBuffer(value) && isArrayBuffer(other)) {
      if (value.byteLength !== other.byteLength) {
        return false
      }

      const valueTypedArray = new Uint8Array(value)
      const otherTypedArray = new Uint8Array(other)

      return valueTypedArray.every((v, i) => v === otherTypedArray[i])
    }

    if (valueStack.get(value) === other && otherStack.get(other) === value) {
      return true
    }

    valueStack.set(value, other)
    otherStack.set(other, value)

    if ((isMap(value) && isMap(other)) || (isSet(value) && isSet(other))) {
      if (value.size !== other.size) {
        return false
      }

      const valueArray = [...value]
      const otherArray = [...other]
      const result = valueArray.every((v, i) => baseIsEqual(v, otherArray[i], valueStack, otherStack))
      valueStack.delete(value)
      otherStack.delete(other)

      return result
    }

    if (isArray(value) && isArray(other)) {
      if (value.length !== other.length) {
        return false
      }

      const result = value.every((v, i) => baseIsEqual(v, other[i], valueStack, otherStack))
      valueStack.delete(value)
      otherStack.delete(other)

      return result
    }

    if (isPlainObject(value) && isPlainObject(other)) {
      const valueOwnKeys = [...Object.keys(value), ...Object.getOwnPropertySymbols(value)]
      const otherOwnKeys = [...Object.keys(other), ...Object.getOwnPropertySymbols(other)]

      if (valueOwnKeys.length !== otherOwnKeys.length) {
        return false
      }

      const result = valueOwnKeys.every((k) =>
        baseIsEqual(value[k as keyof typeof value], other[k as keyof typeof other], valueStack, otherStack),
      )

      valueStack.delete(value)
      otherStack.delete(other)

      return result
    }

    return false
  }

  return baseIsEqual(value, other, valueStack, otherStack)
}
