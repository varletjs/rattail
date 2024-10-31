import { it, expect } from 'vitest'
import { pascalCase, camelize, kebabCase, slash, genStringKey, upperFirst, lowerFirst } from '../src'

it('pascalCase', () => {
  expect(pascalCase('hello-world')).toBe('HelloWorld')
  expect(pascalCase('fooBar')).toBe('FooBar')
})

it('camelize', () => {
  expect(camelize('hello-world')).toBe('helloWorld')
  expect(camelize('FooBar')).toBe('fooBar')
})

it('kebabCase', () => {
  expect(kebabCase('HelloWorld')).toBe('hello-world')
  expect(kebabCase('fooBar')).toBe('foo-bar')
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
