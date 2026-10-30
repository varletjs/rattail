import { describe, expect, it, vi } from 'vite-plus/test'
import { isFunction, stringifyStableJSON } from '../src'

describe('stringifyStableJSON', () => {
  it('sorts object keys recursively while preserving array order', () => {
    expect(stringifyStableJSON({ z: [{ b: 2, a: 1 }, 3, 1], a: true })).toBe('{"a":true,"z":[{"a":1,"b":2},3,1]}')
    expect(stringifyStableJSON({ a: 1, b: 2 })).toBe(stringifyStableJSON({ b: 2, a: 1 }))
  })

  it('sorts integer-like keys lexicographically', () => {
    expect(stringifyStableJSON({ 2: 'two', 10: 'ten', 1: 'one' })).toBe('{"1":"one","10":"ten","2":"two"}')
  })

  it.each([null, true, false, 0, -0, 1.25, NaN, Infinity, -Infinity, 'a"\\\n', undefined, Symbol('a')])(
    'preserves native primitive behavior for %s',
    (value) => {
      expect(stringifyStableJSON(value)).toBe(JSON.stringify(value))
    },
  )

  it('omits unsupported object properties and substitutes null in arrays', () => {
    const value = { d: [undefined, () => 1, Symbol('a'), NaN], c: Symbol('c'), b: () => 1, a: undefined }

    expect(stringifyStableJSON(value)).toBe('{"d":[null,null,null,null]}')
    expect(stringifyStableJSON(() => 1)).toBeUndefined()
    expect(stringifyStableJSON(Array(2))).toBe('[null,null]')
  })

  it('preserves native toJSON keys and invokes hooks and getters only once', () => {
    const toJSON = vi.fn((key: string) => ({ z: key, a: 1 }))
    const getter = vi.fn(() => 2)
    const value = {
      b: { toJSON },
      get a() {
        return getter()
      },
    }

    expect(stringifyStableJSON(value)).toBe('{"a":2,"b":{"a":1,"z":"b"}}')
    expect(toJSON).toHaveBeenCalledExactlyOnceWith('b')
    expect(getter).toHaveBeenCalledTimes(1)
    expect(stringifyStableJSON(new Date('2020-01-01T00:00:00Z'))).toBe('"2020-01-01T00:00:00.000Z"')
  })

  it('handles boxed primitives, maps and sets like JSON.stringify', () => {
    for (const value of [Object(3), Object('ab'), Object(false), new Map([['a', 1]]), new Set([1])]) {
      expect(stringifyStableJSON(value)).toBe(JSON.stringify(value))
    }
  })

  it('allows shared references but rejects circular objects and arrays', () => {
    const shared = { b: 2, a: 1 }
    expect(stringifyStableJSON({ z: shared, a: shared })).toBe('{"a":{"a":1,"b":2},"z":{"a":1,"b":2}}')
    const circular: { self?: unknown } = {}
    circular.self = circular
    const array: unknown[] = []
    array.push(array)

    expect(() => stringifyStableJSON(circular)).toThrow(TypeError)
    expect(() => stringifyStableJSON(array)).toThrow(TypeError)
    expect(() => stringifyStableJSON(1n)).toThrow(TypeError)
  })

  it('preserves special property names and ignores inherited and symbol properties', () => {
    const value = JSON.parse('{"constructor":2,"__proto__":{"z":1,"a":2}}')
    expect(stringifyStableJSON(value)).toBe('{"__proto__":{"a":2,"z":1},"constructor":2}')
    const inherited = Object.create({ inherited: 1 })
    inherited.own = 2
    inherited[Symbol('hidden')] = 3
    expect(stringifyStableJSON(inherited)).toBe('{"own":2}')
  })

  it('does not mutate input and propagates getter errors', () => {
    const nested = Object.freeze({ z: 1, a: 2 })
    const value = Object.freeze({ z: nested, a: [nested] })
    expect(stringifyStableJSON(value)).toBe('{"a":[{"a":2,"z":1}],"z":{"a":2,"z":1}}')
    expect(Object.keys(value)).toEqual(['z', 'a'])
    const error = new Error('getter')
    expect(() =>
      stringifyStableJSON({
        get value() {
          throw error
        },
      }),
    ).toThrow(error)
  })
})

const rawJSON: unknown = Reflect.get(JSON, 'rawJSON')

if (isFunction(rawJSON)) {
  describe('stringifyStableJSON with JSON.rawJSON', () => {
    it.each(['9007199254740993', '1e400', '-0', '1.2300', '1E+02'])(
      'preserves the numeric source %s without precision loss',
      (literal) => {
        expect(stringifyStableJSON(rawJSON(literal))).toBe(literal)
        expect(stringifyStableJSON({ z: rawJSON(literal), a: [rawJSON(literal)] })).toBe(
          `{"a":[${literal}],"z":${literal}}`,
        )
      },
    )

    it('preserves raw JSON string escape sequences', () => {
      const literal = '"\\u0061"'
      expect(stringifyStableJSON(rawJSON(literal))).toBe(literal)
    })
  })
}

describe('stringifyStableJSON structural edge cases', () => {
  it('handles empty containers and delimiters and escapes within keys and values', () => {
    const value = { z: [{}, [], { b: '},:[\\"', a: '\u0000\n' }], '\u0000': 1, 'a"\\': 2 }
    const result = stringifyStableJSON(value)
    expect(result).toBeDefined()
    expect(JSON.parse(result ?? '')).toEqual(value)
    expect(result).toBe(stringifyStableJSON({ 'a"\\': 2, '\u0000': 1, z: value.z }))
  })

  it('orders escaped keys by their decoded UTF-16 values', () => {
    const value = { '\n': 2, ' ': 3, '\u0000': 1, a: 4, '\ud800': 5, '😀': 6 }
    expect(stringifyStableJSON(value)).toBe('{"\\u0000":1,"\\n":2," ":3,"a":4,"\\ud800":5,"😀":6}')
  })

  it('preserves native getter evaluation order before sorting', () => {
    const events: string[] = []
    const value = {
      get z() {
        events.push('z')
        return 1
      },
      get a() {
        events.push('a')
        return 2
      },
    }

    expect(stringifyStableJSON(value)).toBe('{"a":2,"z":1}')
    expect(events).toEqual(['z', 'a'])
  })

  it('calls a returned object toJSON only when native JSON.stringify would', () => {
    const returnedHook = vi.fn(() => 'unexpected')
    const value = { toJSON: () => ({ z: 1, a: 2, toJSON: returnedHook }) }

    expect(stringifyStableJSON(value)).toBe('{"a":2,"z":1}')
    expect(returnedHook).not.toHaveBeenCalled()
  })

  it('handles large strings and many object properties without changing content', () => {
    const value: Record<string, number | string> = Object.fromEntries(
      Array.from({ length: 1000 }, (_, index) => [`key-${999 - index}`, index]),
    )
    value['text'] = '"\\},:[\n'.repeat(20000)
    const result = stringifyStableJSON(value)

    expect(JSON.parse(result ?? '')).toEqual(value)
    expect(stringifyStableJSON(JSON.parse(result ?? ''))).toBe(result)
  })
})
