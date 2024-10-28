import { it, expect } from 'vitest'
import {
  isNonEmptyArray,
  isString,
  isBoolean,
  isNumber,
  toTypeString,
  isDate,
  isMap,
  isSet,
  isRegExp,
  isSymbol,
  isNumeric,
  isPlainObject,
  isObject,
  isPromise,
  isArray,
  isEmpty,
  isFunction,
  isNullish,
  isURL,
  isWindow,
  isTruthy,
  toRawType,
  hasOwn,
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

it('isTruthy', () => {
  expect(isTruthy(1)).toBe(true)
  expect(isTruthy(true)).toBe(true)
  expect(isTruthy('string')).toBe(true)
  expect(isTruthy(0)).toBe(false)
  expect(isTruthy(null)).toBe(false)
  expect(isTruthy(undefined)).toBe(false)
  expect(isTruthy('')).toBe(false)
})

it('isURL', () => {
  expect(isURL('http://example.com')).toBe(true)
  expect(isURL('https://example.com')).toBe(true)
  expect(isURL('/relative/path')).toBe(true)
  expect(isURL('relative/path')).toBe(true)
  expect(isURL('example.com')).toBe(false)
  expect(isURL('')).toBe(false)
  expect(isURL(null)).toBe(false)
  expect(isURL(undefined)).toBe(false)
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

it('hasOwn', () => {
  expect(hasOwn({ foo: 1 }, 'foo')).toBe(true)
  expect(hasOwn({ foo: 1 }, 'bar')).toBe(false)
  expect(hasOwn(Object.create({ foo: 1 }), 'foo')).toBe(false)
})
