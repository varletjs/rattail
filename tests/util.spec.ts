import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  cancelAnimationFrame,
  classes,
  copyText,
  createNamespaceFn,
  createStorage,
  delay,
  doubleRaf,
  download,
  getAllParentScroller,
  getParentScroller,
  getRect,
  getScrollLeft,
  getScrollTop,
  getStyle,
  inViewport,
  motion,
  prettyJSONObject,
  preventDefault,
  raf,
  requestAnimationFrame,
  tryParseJSON,
} from '../src'

it('requestAnimationFrame', () => {
  const fn = vi.fn()
  const originFn = globalThis.requestAnimationFrame
  globalThis.requestAnimationFrame = fn

  requestAnimationFrame(fn)
  expect(fn).toHaveBeenCalled()

  globalThis.requestAnimationFrame = originFn
})

it('cancelAnimationFrame', () => {
  const fn = vi.fn()
  const originFn = globalThis.cancelAnimationFrame
  globalThis.cancelAnimationFrame = fn

  cancelAnimationFrame(1)
  expect(fn).toHaveBeenCalledWith(1)

  globalThis.cancelAnimationFrame = originFn
})

it('raf & doubleRaf', async () => {
  const fn = vi.fn((resolve) => resolve())
  const originFn = globalThis.requestAnimationFrame
  globalThis.requestAnimationFrame = fn

  await raf()
  expect(fn).toHaveBeenCalled()

  await doubleRaf()
  expect(fn).toHaveBeenCalledTimes(3)

  globalThis.requestAnimationFrame = originFn
})

it('getStyle', () => {
  const element = document.createElement('div')
  document.body.appendChild(element)
  const style = getStyle(element)
  expect(style).toBeInstanceOf(CSSStyleDeclaration)
  document.body.removeChild(element)
})

it('getRect', () => {
  const element = document.createElement('div')
  document.body.appendChild(element)
  const rect = getRect(element)
  expect(rect).toHaveProperty('width')
  document.body.removeChild(element)

  const windowRect = getRect(window)
  expect(windowRect).toHaveProperty('width', window.innerWidth)
  expect(JSON.stringify(windowRect)).toBe(
    JSON.stringify({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      width: window.innerWidth,
      height: window.innerHeight,
    }),
  )
})

it('inViewport should return true if element is in viewport', () => {
  const element = document.createElement('div')
  document.body.appendChild(element)
  Object.assign(element.style, { position: 'fixed', top: '0', left: '0' })

  expect(inViewport(element)).toBe(true)
  document.body.removeChild(element)
})

describe('getParentScroller', () => {
  it('found', () => {
    const parent = document.createElement('div')
    parent.style.overflowY = 'scroll'
    document.body.appendChild(parent)

    const child = document.createElement('div')
    parent.appendChild(child)

    expect(getParentScroller(child)).toBe(parent)
    document.body.removeChild(parent)
  })

  it('not found', () => {
    const child = document.createElement('div')
    expect(getParentScroller(child)).toBe(window)
  })
})

it('getAllParentScroller', () => {
  const parent1 = document.createElement('div')
  parent1.style.overflowY = 'scroll'
  const parent2 = document.createElement('div')
  document.body.appendChild(parent1)
  parent1.appendChild(parent2)

  const child = document.createElement('div')
  parent2.appendChild(child)

  expect(getAllParentScroller(child)).toEqual([parent1, window])
  document.body.removeChild(parent1)
})

describe('preventDefault', () => {
  it('cancelable', () => {
    const event = { preventDefault: vi.fn(), cancelable: true } as unknown as Event
    preventDefault(event)
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('not cancelable', () => {
    const event = { preventDefault: vi.fn(), cancelable: false } as unknown as Event
    preventDefault(event)
    expect(event.preventDefault).not.toHaveBeenCalled()
  })
})

it('getScrollTop', () => {
  document.body.scrollTop = 100
  expect(getScrollTop(document.body)).toBe(100)
})

it('getScrollLeft', () => {
  document.body.scrollLeft = 50
  expect(getScrollLeft(document.body)).toBe(50)
})

it('classes should return an array of classes based on conditions', () => {
  expect(classes('class1', [true, 'class2'], [false, 'class3', 'class4'])).toEqual(['class1', 'class2', 'class4'])
})

it('createNamespaceFn should create a BEM namespace function', () => {
  const createNamespace = createNamespaceFn('var')
  const { n, name, classes } = createNamespace('button')

  expect(n()).toBe('var-button')
  expect(n('element')).toBe('var-button__element')
  expect(n('--modifier')).toBe('var-button--modifier')
  expect(n('$-box')).toBe('var-box')
  expect(name).toBe('VarButton')
  expect(classes('class1', [true, 'class2'], [false, 'class3', 'class4'])).toEqual(['class1', 'class2', 'class4'])
})

describe('Storage utility functions', () => {
  let mockStorage: Storage

  beforeEach(() => {
    const store: Record<string, string> = {}
    mockStorage = {
      length: 0,
      clear: vi.fn(() => {
        Object.keys(store).forEach((key) => {
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
})

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

describe('copyText', () => {
  it('should copy text successfully', () => {
    const execCommandMock = vi.fn().mockImplementation(() => true)
    document.execCommand = execCommandMock
    copyText('Hello, world!')
    expect(execCommandMock).toHaveBeenCalledWith('copy')
    execCommandMock.mockRestore()
  })

  it('should not execute copy when no text is provided', () => {
    const execCommandMock = vi.fn()
    document.execCommand = execCommandMock
    copyText('')
    expect(execCommandMock).not.toHaveBeenCalled()
    execCommandMock.mockRestore()
  })
})

it('download', () => {
  let href = ''
  let filename = ''

  Reflect.defineProperty(HTMLAnchorElement.prototype, 'href', {
    set(v) {
      href = v
    },
    get() {
      return href
    },
  })

  Reflect.defineProperty(HTMLAnchorElement.prototype, 'download', {
    set(v) {
      filename = v
    },
    get() {
      return filename
    },
  })

  URL.createObjectURL = vi.fn(() => 'mock')
  URL.revokeObjectURL = vi.fn()
  download(new Blob(['hello']), 'test.txt')
  expect(href).toBe('mock')
  expect(filename).toBe('test.txt')
  expect(URL.createObjectURL).toHaveBeenCalled()
  expect(URL.revokeObjectURL).toHaveBeenCalled()

  download('/a.jpg')
  expect(href).toBe('/a.jpg')
  expect(filename).toBe('file')
})

describe('motion', () => {
  it('start', async () => {
    const frame = vi.fn()
    const onStateChange = vi.fn()
    const { start, getState } = motion({
      from: 0,
      to: 100,
      frame,
      onStateChange,
    })

    expect(getState()).toBe('pending')
    start()
    expect(getState()).toBe('running')
    expect(onStateChange).toHaveBeenLastCalledWith('running')
    await delay(299)
    expect(getState()).toBe('running')
    await delay(1 + 20)
    expect(getState()).toBe('finished')
    expect(onStateChange).toHaveBeenLastCalledWith('finished')
    expect(frame).toHaveBeenLastCalledWith({ value: 100, done: true })
  })

  it('pause and restart', async () => {
    const frame = vi.fn()
    const onStateChange = vi.fn()
    const { start, pause, getState } = motion({
      from: 0,
      to: 100,
      frame,
      onStateChange,
    })

    start()
    expect(getState()).toBe('running')
    pause()
    expect(getState()).toBe('paused')
    expect(onStateChange).toHaveBeenLastCalledWith('paused')
    await delay(300 + 20)
    expect(getState()).toBe('paused')
    start()
    await delay(299)
    expect(getState()).toBe('running')
    await delay(1 + 20)
    expect(getState()).toBe('finished')
    expect(onStateChange).toHaveBeenLastCalledWith('finished')
    expect(frame).toHaveBeenLastCalledWith({ value: 100, done: true })
  })

  it('reset', () => {
    const frame = vi.fn()
    const onStateChange = vi.fn()
    const { start, reset, getState } = motion({
      from: 0,
      to: 100,
      frame,
      onStateChange,
    })

    start()
    expect(getState()).toBe('running')
    reset()
    expect(getState()).toBe('pending')
    expect(onStateChange).toHaveBeenLastCalledWith('pending')
  })

  it('duration', async () => {
    const frame = vi.fn()
    const onStateChange = vi.fn()
    const { start, getState } = motion({
      from: 0,
      to: 100,
      duration: 100,
      frame,
      onStateChange,
    })

    expect(getState()).toBe('pending')
    start()
    expect(getState()).toBe('running')
    expect(onStateChange).toHaveBeenLastCalledWith('running')
    await delay(99)
    expect(getState()).toBe('running')
    await delay(1 + 20)
    expect(getState()).toBe('finished')
    expect(onStateChange).toHaveBeenLastCalledWith('finished')
    expect(frame).toHaveBeenLastCalledWith({ value: 100, done: true })
  })

  it('timingFunction', async () => {
    const frame = vi.fn()
    const { start } = motion({
      from: 0,
      to: 100,
      frame,
      timingFunction: () => 1,
    })

    start()
    await delay(20)
    expect(frame).toHaveBeenLastCalledWith({ value: 100, done: false })
    await delay(300)
    expect(frame).toHaveBeenLastCalledWith({ value: 100, done: true })
  })

  it('state', async () => {
    const frame = vi.fn()
    const onStateChange = vi.fn()
    const { start, reset, pause } = motion({
      from: 0,
      to: 100,
      duration: 100,
      frame,
      onStateChange,
    })

    start()
    expect(onStateChange).toBeCalledTimes(1)
    expect(onStateChange).toHaveBeenLastCalledWith('running')

    start()
    expect(onStateChange).toBeCalledTimes(1)
    expect(onStateChange).toHaveBeenLastCalledWith('running')

    await delay(100 + 20)
    expect(onStateChange).toBeCalledTimes(2)
    expect(onStateChange).toHaveBeenLastCalledWith('finished')

    start()
    expect(onStateChange).toBeCalledTimes(2)
    expect(onStateChange).toHaveBeenLastCalledWith('finished')

    reset()
    expect(onStateChange).toBeCalledTimes(3)
    expect(onStateChange).toHaveBeenLastCalledWith('pending')

    pause()
    expect(onStateChange).toBeCalledTimes(3)
    expect(onStateChange).toHaveBeenLastCalledWith('pending')
  })
})
