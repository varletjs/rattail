import { describe, expect, it } from 'vite-plus/test'
import {
  camelize,
  ensurePrefix,
  ensureSuffix,
  genStringKey,
  kebabCase,
  lowerFirst,
  maskString,
  pascalCase,
  randomColor,
  randomString,
  slash,
  upperFirst,
} from '../src'

describe('maskString', () => {
  it('masks middle characters with default options', () => {
    expect(maskString('abcdefgh')).toBe('ab****gh')
  })

  it('returns original text when length <= 1', () => {
    expect(maskString('a')).toBe('a')
    expect(maskString('')).toBe('')
  })

  it('falls back to reduced suffix for short texts', () => {
    expect(maskString('ab')).toBe('a*')
    expect(maskString('abc')).toBe('ab*')
    expect(maskString('abcd')).toBe('ab*d')
  })

  it('masks single middle character', () => {
    expect(maskString('abcde')).toBe('ab*de')
  })

  it('supports custom prefix and suffix', () => {
    expect(maskString('abcdefgh', { prefix: 3, suffix: 1 })).toBe('abc****h')
    expect(maskString('abcdefgh', { prefix: 1, suffix: 3 })).toBe('a****fgh')
  })

  it('supports custom mask character', () => {
    expect(maskString('abcdefgh', { mask: '#' })).toBe('ab####gh')
  })

  it('supports fixed maskLength', () => {
    expect(maskString('abcdefghijkl', { maskLength: 4 })).toBe('ab****kl')
    expect(maskString('abcde', { maskLength: 4 })).toBe('ab****de')
  })

  it('supports maskLength with custom options', () => {
    expect(maskString('abcdefgh', { prefix: 1, suffix: 1, maskLength: 3, mask: '#' })).toBe('a###h')
  })
})

it('pascalCase', () => {
  expect(pascalCase('hello-world')).toBe('HelloWorld')
  expect(pascalCase('fooBar')).toBe('FooBar')
  expect(pascalCase('hello_world')).toBe('HelloWorld')
  expect(pascalCase('hello_worldFooBar')).toBe('HelloWorldFooBar')
  expect(pascalCase('hello_world_FooBar')).toBe('HelloWorldFooBar')
  expect(pascalCase('Hello_world_FooBar')).toBe('HelloWorldFooBar')
})

it('camelize', () => {
  expect(camelize('hello-world')).toBe('helloWorld')
  expect(camelize('FooBar')).toBe('fooBar')
  expect(camelize('hello_world')).toBe('helloWorld')
  expect(camelize('hello_worldFooBar')).toBe('helloWorldFooBar')
  expect(camelize('hello_world_FooBar')).toBe('helloWorldFooBar')
  expect(camelize('Hello_world_FooBar')).toBe('helloWorldFooBar')
})

it('kebabCase', () => {
  expect(kebabCase('HelloWorld')).toBe('hello-world')
  expect(kebabCase('fooBar')).toBe('foo-bar')
  expect(kebabCase('hello_world')).toBe('hello-world')
  expect(kebabCase('hello_worldFooBar')).toBe('hello-world-foo-bar')
  expect(kebabCase('hello_world_FooBar')).toBe('hello-world-foo-bar')
  expect(kebabCase('Hello_world_FooBar')).toBe('hello-world-foo-bar')
})

it('slash', () => {
  expect(slash('C:\\path\\to\\file')).toBe('C:/path/to/file')
  expect(slash('\\\\?\\C:\\path\\to\\file')).toBe('\\\\?\\C:\\path\\to\\file')
})

it('genStringKey', () => {
  const key1 = genStringKey()
  const key2 = genStringKey()
  expect(key1).not.toBe(key2)
  expect(key1).toBe('generated-key-0')
  expect(key2).toBe('generated-key-1')
})

it('upperFirst', () => {
  expect(upperFirst('hello')).toBe('Hello')
  expect(upperFirst('world')).toBe('World')
})

it('lowerFirst', () => {
  expect(lowerFirst('Hello')).toBe('hello')
  expect(lowerFirst('World')).toBe('world')
})

it('randomColor', () => {
  expect(randomColor()).toMatch(/^#[0-9a-f]{6}$/)
})

it('randomString', () => {
  expect(randomString().length).toBe(10)
  expect(randomString(30).length).toBe(30)
})

it('ensurePrefix', () => {
  expect(ensurePrefix('abc', 'a')).toBe('abc')
  expect(ensurePrefix('bc', 'a')).toBe('abc')
})

it('ensureSuffix', () => {
  expect(ensureSuffix('abc', 'c')).toBe('abc')
  expect(ensureSuffix('ab', 'c')).toBe('abc')
})
