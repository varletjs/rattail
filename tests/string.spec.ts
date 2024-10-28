import { describe, it, expect } from 'vitest'
import { pascalCase, camelize, kebabCase, slash, genStringKey, capitalizeFirstLetter } from '../src'

describe('string utility functions', () => {
  it('should convert string to pascal case', () => {
    expect(pascalCase('hello-world')).toBe('HelloWorld')
    expect(pascalCase('foo-bar')).toBe('FooBar')
  })

  it('should convert string to camel case', () => {
    expect(camelize('hello-world')).toBe('helloWorld')
    expect(camelize('foo-bar')).toBe('fooBar')
  })

  it('should convert string to kebab case', () => {
    expect(kebabCase('HelloWorld')).toBe('hello-world')
    expect(kebabCase('FooBar')).toBe('foo-bar')
  })

  it('should replace backslashes with slashes', () => {
    expect(slash('C:\\path\\to\\file')).toBe('C:/path/to/file')
    expect(slash('\\\\?\\C:\\path\\to\\file')).toBe('\\\\?\\C:\\path\\to\\file')
  })

  it('should generate unique string keys', () => {
    const key1 = genStringKey()
    const key2 = genStringKey()
    expect(key1).not.toBe(key2)
    expect(key1).toBe('0')
    expect(key2).toBe('1')
  })

  it('should capitalize the first letter of a string', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello')
    expect(capitalizeFirstLetter('world')).toBe('World')
  })
})
