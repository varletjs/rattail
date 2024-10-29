import { describe, it, expect } from 'vitest'
import { tryParseJSON, prettyJSONObject } from '../src'

describe('JSON utility functions', () => {
  it('should parse valid JSON strings', () => {
    const jsonString = '{"key": "value"}'
    const result = tryParseJSON(jsonString)
    expect(result).toEqual({ key: 'value' })
  })

  it('should return undefined for invalid JSON strings', () => {
    const invalidJsonString = '{"key": "value"'
    const result = tryParseJSON(invalidJsonString)
    expect(result).toBeUndefined()
  })

  it('should pretty print JSON objects', () => {
    const jsonObject = { key: 'value', number: 42 }
    const prettyString = prettyJSONObject(jsonObject)
    expect(prettyString).toBe('{\n  "key": "value",\n  "number": 42\n}')
  })
})
