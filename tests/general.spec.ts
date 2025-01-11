import { expect, it } from 'vitest'
import {
  assert,
  getGlobalThis,
  hasOwn,
  inBrowser,
  inMobile,
  isArray,
  isArrayBuffer,
  isBlob,
  isBoolean,
  isDataView,
  isDate,
  isDOMException,
  isEmpty,
  isEmptyPlainObject,
  isEqual,
  isEqualWith,
  isError,
  isFile,
  isFunction,
  isMap,
  isNonEmptyArray,
  isNullish,
  isNumber,
  isNumeric,
  isObject,
  isPlainObject,
  isPrimitive,
  isPromise,
  isRegExp,
  isSet,
  isString,
  isSymbol,
  isTruthy,
  isTypedArray,
  isWeakMap,
  isWeakSet,
  isWindow,
  supportTouch,
  toRawType,
  toTypeString,
} from '../src'

it('isNonEmptyArray', () => {
  expect(isNonEmptyArray([])).toBe(false)

  expect(isNonEmptyArray([1, 2])).toBe(true)
})

it('toTypeString', () => {
  expect(toTypeString([])).toBe('[object Array]')
  expect(toTypeString({})).toBe('[object Object]')
  expect(toTypeString(1)).toBe('[object Number]')
  expect(toTypeString('')).toBe('[object String]')
  expect(toTypeString(false)).toBe('[object Boolean]')
  expect(toTypeString(null)).toBe('[object Null]')
  expect(toTypeString(undefined)).toBe('[object Undefined]')
})

it('toRawType', () => {
  expect(toRawType([])).toBe('Array')
  expect(toRawType({})).toBe('Object')
  expect(toRawType(1)).toBe('Number')
  expect(toRawType('')).toBe('String')
  expect(toRawType(false)).toBe('Boolean')
  expect(toRawType(null)).toBe('Null')
  expect(toRawType(undefined)).toBe('Undefined')
})

it('isSymbol', () => {
  expect(isSymbol(Symbol('test'))).toBe(true)
})

it('isDate', () => {
  expect(isDate(new Date())).toBe(true)
})

it('isMap', () => {
  expect(isMap(new Map())).toBe(true)
})

it('isSet', () => {
  expect(isSet(new Set())).toBe(true)
})

it('isRegExp', () => {
  expect(isRegExp(/test/g)).toBe(true)
})

it('isString', () => {
  expect(isString([])).toBe(false)
  expect(isString(false)).toBe(false)
  expect(isString(1)).toBe(false)
  expect(isString(null)).toBe(false)
  expect(isString(undefined)).toBe(false)
  expect(isString({})).toBe(false)

  expect(isString('')).toBe(true)
})

it('isBoolean', () => {
  expect(isBoolean([])).toBe(false)
  expect(isBoolean(1)).toBe(false)
  expect(isBoolean(null)).toBe(false)
  expect(isBoolean(undefined)).toBe(false)
  expect(isBoolean({})).toBe(false)
  expect(isBoolean('')).toBe(false)

  expect(isBoolean(false)).toBe(true)
  expect(isBoolean(true)).toBe(true)
})

it('isNumber', () => {
  expect(isNumber([])).toBe(false)
  expect(isNumber(false)).toBe(false)
  expect(isNumber(null)).toBe(false)
  expect(isNumber(undefined)).toBe(false)
  expect(isNumber({})).toBe(false)
  expect(isNumber('')).toBe(false)

  expect(isNumber(1)).toBe(true)
  expect(isNumber(NaN)).toBe(true)
})

it('isNumeric', () => {
  expect(isNumeric(123)).toBe(true)
  expect(isNumeric(-123)).toBe(true)
  expect(isNumeric(0)).toBe(true)

  expect(isNumeric('123')).toBe(true)
  expect(isNumeric('-123')).toBe(true)
  expect(isNumeric('+123')).toBe(true)

  expect(isNumeric('123.45')).toBe(false)
  expect(isNumeric('abc')).toBe(false)
  expect(isNumeric(null)).toBe(false)
  expect(isNumeric(undefined)).toBe(false)
  expect(isNumeric([])).toBe(false)
  expect(isNumeric({})).toBe(false)
})

it('isPlainObject', () => {
  expect(isPlainObject([])).toBe(false)
  expect(isPlainObject(null)).toBe(false)
  expect(isPlainObject(undefined)).toBe(false)
  expect(isPlainObject(123)).toBe(false)
  expect(isPlainObject('123')).toBe(false)
  expect(isPlainObject(() => {})).toBe(false)
  expect(isPlainObject({})).toBe(true)
  expect(isPlainObject({ key: 'value' })).toBe(true)
})

it('isObject', () => {
  expect(isObject({})).toBe(true)
  expect(isObject([])).toBe(true)
  expect(isObject(null)).toBe(false)

  expect(isObject(123)).toBe(false)
  expect(isObject('abc')).toBe(false)
  expect(isObject(undefined)).toBe(false)
  expect(isObject(() => {})).toBe(false)
})

it('isPromise', () => {
  expect(isPromise(Promise.resolve())).toBe(true)
  expect(isPromise({ then: () => {}, catch: () => {} })).toBe(true)
  expect(isPromise({ then: () => {} })).toBe(false)
  expect(isPromise({ catch: () => {} })).toBe(false)
  expect(isPromise(null)).toBe(false)
  expect(isPromise({})).toBe(false)
  expect(isPromise([])).toBe(false)
  expect(isPromise('Promise')).toBe(false)
  expect(isPromise(123)).toBe(false)
})

it('isFunction', () => {
  expect(isFunction(() => {})).toBe(true)
  expect(isFunction(123)).toBe(false)
  expect(isFunction('function')).toBe(false)
  expect(isFunction({})).toBe(false)
})

it('isArray', () => {
  expect(isArray([1, 2, 3])).toBe(true)
  expect(isArray([])).toBe(true)
  expect(isArray('Array')).toBe(false)
  expect(isArray({})).toBe(false)
  expect(isArray(null)).toBe(false)
})

it('isNullish', () => {
  expect(isNullish(null)).toBe(true)
  expect(isNullish(undefined)).toBe(true)
  expect(isNullish(0)).toBe(false)
  expect(isNullish('')).toBe(false)
  expect(isNullish(false)).toBe(false)
})

it('isWeakSet', () => {
  expect(isWeakSet(new WeakSet())).toBe(true)
})

it('isWeakMap', () => {
  expect(isWeakMap(new WeakMap())).toBe(true)
})

it('isArrayBuffer', () => {
  expect(isArrayBuffer(new ArrayBuffer(1))).toBe(true)
})

it('isError', () => {
  expect(isError(new Error())).toBe(true)
})

it('isDOMException', () => {
  expect(isDOMException(new DOMException())).toBe(true)
})

it('isTypedArray', () => {
  expect(isTypedArray(new Int8Array())).toBe(true)
  expect(isTypedArray(new Uint8Array())).toBe(true)
  expect(isTypedArray(new Uint8ClampedArray())).toBe(true)
  expect(isTypedArray(new Int16Array())).toBe(true)
  expect(isTypedArray(new Uint16Array())).toBe(true)
  expect(isTypedArray(new Int32Array())).toBe(true)
  expect(isTypedArray(new Uint32Array())).toBe(true)
  expect(isTypedArray(new Float32Array())).toBe(true)
  expect(isTypedArray(new Float64Array())).toBe(true)
  expect(isTypedArray(new BigInt64Array())).toBe(true)
  expect(isTypedArray(new BigUint64Array())).toBe(true)
})

it('isDataView', () => {
  expect(isDataView(new DataView(new ArrayBuffer(1)))).toBe(true)
})

it('isTruthy', () => {
  expect(isTruthy(1)).toBe(true)
  expect(isTruthy(true)).toBe(true)
  expect(isTruthy('string')).toBe(true)
  expect(isTruthy(0)).toBe(false)
  expect(isTruthy(null)).toBe(false)
  expect(isTruthy(undefined)).toBe(false)
  expect(isTruthy('')).toBe(false)
})

it('isEmpty', () => {
  expect(isEmpty(undefined)).toBe(true)
  expect(isEmpty(null)).toBe(true)
  expect(isEmpty('')).toBe(true)
  expect(isEmpty([])).toBe(true)
  expect(isEmpty([1, 2, 3])).toBe(false)
  expect(isEmpty('non-empty string')).toBe(false)
  expect(isEmpty(0)).toBe(false)
  expect(isEmpty({})).toBe(false)
})

it('isWindow', () => {
  expect(isWindow(window)).toBe(true)
  expect(isWindow({})).toBe(false)
  expect(isWindow(undefined)).toBe(false)
})

it('isFile', () => {
  expect(isFile(new File([], 'test.txt'))).toBe(true)
  expect(isFile(new Blob([]))).toBe(false)
})

it('isBlob', () => {
  expect(isBlob(new Blob([]))).toBe(true)
  expect(isBlob(new File([], 'test.txt'))).toBe(false)
})

it('hasOwn', () => {
  expect(hasOwn({ foo: 1 }, 'foo')).toBe(true)
  expect(hasOwn({ foo: 1 }, 'bar')).toBe(false)
  expect(hasOwn(Object.create({ foo: 1 }), 'foo')).toBe(false)
})

it('supportTouch', () => {
  expect(supportTouch()).toBe(true)
})

it('inBrowser', () => {
  expect(inBrowser()).toBe(true)
})

it('inMobile', () => {
  expect(inMobile()).toBe(false)
})

it('getGlobalThis', () => {
  expect(getGlobalThis()).toBe(globalThis)
  expect(getGlobalThis()).toBe(window)
  expect(getGlobalThis()).toBe(self)
})

it('isEqual', () => {
  expect(isEqual('123', '123')).toBe(true)
  expect(isEqual('123', '1234')).toBe(false)
  expect(isEqual(1, 1)).toBe(true)
  expect(isEqual(1, 2)).toBe(false)
  expect(isEqual(true, true)).toBe(true)
  expect(isEqual(true, false)).toBe(false)
  expect(isEqual(NaN, NaN)).toBe(true)
  expect(isEqual(Promise.resolve(), Promise.resolve())).toBe(false)
  expect(isEqual(/abc/, /abc/)).toBe(true)
  expect(isEqual(/abc/g, /abc/)).toBe(false)
  expect(isEqual(/abc/, /abcd/)).toBe(false)
  expect(isEqual(Symbol('test'), Symbol('test'))).toBe(false)
  expect(isEqual(new WeakMap(), new WeakMap())).toBe(false)
  expect(isEqual(new WeakSet(), new WeakSet())).toBe(false)
  expect(isEqual(new Date('2024/11/03'), new Date('2024/11/03'))).toBe(true)
  expect(isEqual(new Date('2024/11/03'), new Date('2024/11/04'))).toBe(false)
  expect(isEqual(new Error('message'), new Error('message'))).toBe(true)
  expect(isEqual(new Error('message'), new Error('mess'))).toBe(false)
  expect(isEqual(new DOMException('message'), new DOMException('message'))).toBe(true)
  expect(isEqual(new DOMException('message'), new DOMException('mess'))).toBe(false)
  expect(
    isEqual(
      () => {},
      () => {},
    ),
  ).toBe(false)

  expect(isEqual(new String('123'), new String('123'))).toBe(true)

  expect(isEqual(new String('123'), new String('1234'))).toBe(false)

  expect(isEqual(new Number(1), new Number(1))).toBe(true)

  expect(isEqual(new Number(1), new Number(2))).toBe(false)

  expect(isEqual(new Boolean(true), new Boolean(true))).toBe(true)

  expect(isEqual(new Boolean(true), new Boolean(false))).toBe(false)

  // eslint-disable-next-line symbol-description
  expect(isEqual(new Object(Symbol()), new Object(Symbol()))).toBe(false)

  expect(isEqual(new Object(BigInt(1)), new Object(BigInt(1)))).toBe(true)

  expect(isEqual(new Object(BigInt(1)), new Object(BigInt(2)))).toBe(false)

  expect(isEqual('123', new String('123'))).toBe(false)

  expect(isEqual(1, new Number(1))).toBe(false)

  expect(isEqual(true, new Boolean(true))).toBe(false)

  expect(isEqual(Symbol('test'), new Object(Symbol('test')))).toBe(false)

  expect(isEqual(BigInt(1), new Object(BigInt(1)))).toBe(false)

  class A {}
  class B {}

  expect(isEqual(new A(), new A())).toBe(true)
  expect(isEqual(new A(), new B())).toBe(false)

  expect(isEqual(new Set([1]), new Set([1]))).toBe(true)
  expect(isEqual(new Set([1]), new Set([]))).toBe(false)
  expect(isEqual(new Set([{ n: 1 }]), new Set([{ n: 1 }]))).toBe(true)
  expect(isEqual(new Set([{ n: 1 }]), new Set([{ n: 2 }]))).toBe(false)

  expect(isEqual(new Map([['a', 1]]), new Map([['a', 1]]))).toBe(true)
  expect(isEqual(new Map([['a', 1]]), new Map())).toBe(false)
  expect(isEqual(new Map([['a', 1]]), new Map([['a', 2]]))).toBe(false)
  expect(isEqual(new Map([['a', { n: 1 }]]), new Map([['a', { n: 1 }]]))).toBe(true)
  expect(isEqual(new Map([[{ n: 1 }, { n: 1 }]]), new Map([[{ n: 1 }, { n: 1 }]]))).toBe(true)
  expect(isEqual(new Map([[{ n: 1 }, { n: 1 }]]), new Map([[{ n: 2 }, { n: 1 }]]))).toBe(false)

  expect(isEqual(new Int8Array(8), new Int8Array(8))).toBe(true)
  expect(isEqual(new Int8Array(8), new Int8Array(10))).toBe(false)
  expect(isEqual(new ArrayBuffer(8), new ArrayBuffer(8))).toBe(true)
  expect(isEqual(new ArrayBuffer(8), new ArrayBuffer(10))).toBe(false)
  expect(isEqual(new TextEncoder().encode('123').buffer, new TextEncoder().encode('123').buffer)).toBe(true)
  expect(isEqual(new TextEncoder().encode('123').buffer, new TextEncoder().encode('1234').buffer)).toBe(false)

  expect(isEqual({ n: 1 }, { n: 1 })).toBe(true)
  expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true)
  expect(isEqual([1, 2, 3], { 0: 1, 1: 2, 2: 3 })).toBe(false)
  expect(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true)
  expect(isEqual({ n: 1 }, { n: 2 })).toBe(false)
  expect(isEqual({ n: 1, x: [1] }, { n: 1, x: [1] })).toBe(true)
  expect(isEqual({ n: 1, x: [1] }, { n: 1, x: [1, 2] })).toBe(false)
  expect(isEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } })).toBe(true)
  expect(isEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } }, a1: {} })).toBe(false)
  expect(isEqual([{ a: { b: { c: 1 } } }], [{ a: { b: { c: 1 } } }])).toBe(true)

  const a: Record<string, any> = { n: 1 }
  a.self = a
  const b: Record<string, any> = { n: 1, self: { n: 1 } }
  b.self.self = a

  const c = [a, b]
  const d = [b, a]

  const x: Record<string, any> = { n: 1 }
  const y: Record<string, any> = { n: 1 }
  x.self = x
  y.self = y

  expect(isEqual(a, b)).toBe(true)
  expect(isEqual(c, d)).toBe(true)
  expect(isEqual(x, y)).toBe(true)
})

it('isEqualWith', () => {
  expect(isEqualWith({}, [], (a, b) => typeof a === typeof b)).toBe(true)
  expect(isEqualWith([1, 2, 3], [1, 2, 4], (a, b) => a.length === b.length)).toBe(true)
  expect(
    isEqualWith(
      () => {},
      () => {},
      (a, b) => isFunction(a) === isFunction(b),
    ),
  ).toBe(true)

  expect(
    isEqualWith([1, 2], ['1', '2'], (v1, v2) => {
      if (!isObject(v1) && !isObject(v2)) {
        return String(v1) === String(v2)
      }
    }),
  ).toBe(true)
})

it('isPrimitive', () => {
  expect(isPrimitive(1)).toBe(true)
  expect(isPrimitive(BigInt(1))).toBe(true)
  expect(isPrimitive('1')).toBe(true)
  expect(isPrimitive(true)).toBe(true)
  expect(isPrimitive(Symbol('test'))).toBe(true)
  expect(isPrimitive(null)).toBe(true)
  expect(isPrimitive(undefined)).toBe(true)
  expect(isPrimitive({})).toBe(false)
  expect(isPrimitive([])).toBe(false)
  expect(isPrimitive(() => {})).toBe(false)
  expect(isPrimitive(function () {})).toBe(false)
  expect(isPrimitive(async function () {})).toBe(false)
  expect(isPrimitive(new Date())).toBe(false)
  expect(isPrimitive(new Error())).toBe(false)
  expect(isPrimitive(new DOMException())).toBe(false)
  expect(isPrimitive(new Map())).toBe(false)
  expect(isPrimitive(new Set())).toBe(false)
  expect(isPrimitive(new WeakMap())).toBe(false)
  expect(isPrimitive(new WeakSet())).toBe(false)
  expect(isPrimitive(new ArrayBuffer(1))).toBe(false)
  expect(isPrimitive(new Int8Array())).toBe(false)
  expect(isPrimitive(new Uint8Array())).toBe(false)
  expect(isPrimitive(new Uint8ClampedArray())).toBe(false)
  expect(isPrimitive(new Int16Array())).toBe(false)
  expect(isPrimitive(new Uint16Array())).toBe(false)
  expect(isPrimitive(new Int32Array())).toBe(false)
  expect(isPrimitive(new Uint32Array())).toBe(false)
  expect(isPrimitive(new Float32Array())).toBe(false)
  expect(isPrimitive(new Float64Array())).toBe(false)
  expect(isPrimitive(new BigInt64Array())).toBe(false)
  expect(isPrimitive(new BigUint64Array())).toBe(false)
  expect(isPrimitive(new DataView(new ArrayBuffer(1)))).toBe(false)
  expect(isPrimitive(new Blob([]))).toBe(false)
  expect(isPrimitive(new File([], 'test.txt'))).toBe(false)
})

it('isEmptyPlainObject', () => {
  expect(isEmptyPlainObject({})).toBe(true)
  expect(isEmptyPlainObject(Object.create(null))).toBe(true)
  expect(isEmptyPlainObject([])).toBe(false)
  expect(isEmptyPlainObject({ a: 1 })).toBe(false)
  // eslint-disable-next-line symbol-description
  expect(isEmptyPlainObject({ [Symbol()]: 1 })).toBe(false)

  const a: Record<string, any> = {}
  Object.defineProperty(a, 'x', {
    enumerable: false,
    value: 1,
  })
  expect(a.x).toBe(1)
  expect(isEmptyPlainObject(a)).toBe(true)
})

it('assert', () => {
  expect(() => assert(false, 'message')).toThrowError('message')
  expect(() => assert(true, 'message')).not.toThrowError()
})
