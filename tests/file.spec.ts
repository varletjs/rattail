import { beforeEach, describe, expect, it } from 'vitest'
import { toArrayBuffer, toDataURL, toText } from '../src'

describe('file', () => {
  let file: File

  beforeEach(() => {
    const blob = new Blob(['Hello, World!'], { type: 'text/plain' })
    file = new File([blob], 'hello.txt', { type: 'text/plain' })
  })

  describe('toDataURL', () => {
    it('should convert file to data URL', async () => {
      const dataURL = await toDataURL(file)
      expect(dataURL).toMatch(/^data:text\/plain;base64,/)
    })
  })

  describe('toText', () => {
    it('should read file as text', async () => {
      const text = await toText(file)
      expect(text).toBe('Hello, World!')
    })
  })

  describe('toArrayBuffer', () => {
    it('should read file as array buffer', async () => {
      const arrayBuffer = await toArrayBuffer(file)
      expect(arrayBuffer).toBeInstanceOf(ArrayBuffer)

      const uint8Array = new Uint8Array(arrayBuffer)
      const text = new TextDecoder().decode(uint8Array)
      expect(text).toBe('Hello, World!')
    })
  })
})
