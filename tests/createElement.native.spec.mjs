// @vitest-environment node
import { JSDOM } from 'jsdom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { createElement } from '../src'

let dom

beforeEach(() => {
  dom = new JSDOM()
  vi.stubGlobal('document', dom.window.document)
})

afterEach(() => {
  vi.unstubAllGlobals()
  dom.window.close()
})

describe('createElement with native DOM listener options', () => {
  it('ignores listeners whose signal is already aborted', () => {
    const listener = vi.fn()
    const controller = new dom.window.AbortController()
    controller.abort()
    const button = createElement('button', {
      on: { click: [listener, { signal: controller.signal }] },
    })

    button.click()

    expect(listener).not.toHaveBeenCalled()
  })

  it('honors AbortSignal.abort and later cancellation without wrapping listeners', () => {
    const aborted = vi.fn()
    const active = vi.fn()
    const controller = new dom.window.AbortController()
    const button = createElement('button', {
      on: {
        click: [aborted, { signal: dom.window.AbortSignal.abort() }],
        focus: [active, { signal: controller.signal }],
      },
    })

    button.click()
    button.dispatchEvent(new dom.window.FocusEvent('focus'))
    controller.abort()
    button.dispatchEvent(new dom.window.FocusEvent('focus'))

    expect(aborted).not.toHaveBeenCalled()
    expect(active).toHaveBeenCalledTimes(1)
  })
})
