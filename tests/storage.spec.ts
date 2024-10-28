import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createStorage, sessionStorage, localStorage } from '../src/storage'

describe('Storage utility functions', () => {
  let mockStorage: Storage

  beforeEach(() => {
    const store: Record<string, string> = {}
    mockStorage = {
      length: 0,
      clear: vi.fn(() => {
        Object.keys(store).forEach(key => {
          delete store[key]
        })
      }),
      getItem: vi.fn((key: string) => store[key] || null),
      key: vi.fn((index: number) => Object.keys(store)[index] || null),
      removeItem: vi.fn((key: string) => {
        delete store[key]
      }),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value
      }),
    }
  })

  it('should set and get string values', () => {
    const storage = createStorage(mockStorage)
    storage.set('key1', 'value1')
    expect(storage.get('key1')).toBe('value1')
  })

  it('should set and get object values', () => {
    const storage = createStorage(mockStorage)
    const obj = { a: 1 }
    storage.set('key2', obj)
    expect(storage.get('key2')).toEqual(obj)
  })

  it('should return null for non-existent keys', () => {
    const storage = createStorage(mockStorage)
    expect(storage.get('nonExistentKey')).toBeNull()
  })

  it('should remove items', () => {
    const storage = createStorage(mockStorage)
    storage.set('key3', 'value3')
    storage.remove('key3')
    expect(storage.get('key3')).toBeNull()
  })

  it('should handle null or undefined values gracefully', () => {
    const storage = createStorage(mockStorage)
    storage.set('key4', null)
    expect(storage.get('key4')).toBeNull()
    storage.set('key5', undefined)
    expect(storage.get('key5')).toBeNull()
  })

  it('should use sessionStorage and localStorage', () => {
    expect(sessionStorage).toBeDefined()
    expect(localStorage).toBeDefined()
  })
})
