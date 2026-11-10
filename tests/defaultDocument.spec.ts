import { afterEach, describe, expect, expectTypeOf, it, vi } from 'vite-plus/test'
import { defaultDocument } from '../src'

afterEach(() => {
  vi.unstubAllGlobals()
  vi.resetModules()
})

describe('defaultDocument', () => {
  it('exports the browser document with an optional document type', () => {
    expect(defaultDocument).toBe(window.document)
    expectTypeOf(defaultDocument).toEqualTypeOf<Document | undefined>()
  })

  it('can be imported without window or document', async () => {
    vi.stubGlobal('window', undefined)
    vi.stubGlobal('document', undefined)
    vi.resetModules()

    const imported = await import('../src/general/defaultDocument')

    expect(imported.defaultDocument).toBeUndefined()
  })

  it('returns undefined when window has no document', async () => {
    vi.stubGlobal('window', {})
    vi.resetModules()

    const imported = await import('../src/general/defaultDocument')

    expect(imported.defaultDocument).toBeUndefined()
  })

  it('keeps the document captured at module evaluation time', () => {
    const replacement = document.implementation.createHTMLDocument('replacement')
    vi.stubGlobal('window', { document: replacement })
    vi.stubGlobal('document', replacement)

    expect(defaultDocument).not.toBe(replacement)
  })
})
