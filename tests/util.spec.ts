import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  cancelAnimationFrame,
  classes,
  copyText,
  createCacheManager,
  createNamespaceFn,
  createStorage,
  delay,
  doubleRaf,
  download,
  duration,
  enumOf,
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

it('duration', () => {
  expect(duration().years(1).valueOf()).toBe(31536000000)
  expect(duration().months(1).valueOf()).toBe(2592000000)
  expect(duration().weeks(1).valueOf()).toBe(604800000)
  expect(duration().days(1).valueOf()).toBe(86400000)
  expect(duration().hours(1).valueOf()).toBe(3600000)
  expect(duration().minutes(1).valueOf()).toBe(60000)
  expect(duration().seconds(1).valueOf()).toBe(1000)
  expect(duration().milliseconds(1).valueOf()).toBe(1)

  expect(duration().years(1).months(2).days(3).hours(4).minutes(5).seconds(6).milliseconds(7).valueOf()).toBe(
    31536000000 + 2592000000 * 2 + 86400000 * 3 + 3600000 * 4 + 60000 * 5 + 1000 * 6 + 7,
  )

  expect(
    duration()
      .years(1)
      .months(2)
      .days(3)
      .hours(4)
      .minutes(5)
      .seconds(6)
      .milliseconds(7)
      .valueOf({ milliseconds: false }),
  ).toBe((31536000000 + 2592000000 * 2 + 86400000 * 3 + 3600000 * 4 + 60000 * 5 + 1000 * 6 + 7) / 1000)
})

it('createCacheManager', async () => {
  const cacheManager = createCacheManager<{ count: number }>({ ttl: 100 })

  cacheManager.set('a', { count: 123 })
  await delay(100)
  expect(cacheManager.get('a')).toBeUndefined()

  cacheManager.set('b', { count: 456 }, { ttl: 200 })
  await delay(150)
  expect(cacheManager.get('b')).toEqual({ count: 456 })
  await delay(60)
  expect(cacheManager.get('b')).toBeUndefined()

  cacheManager.set('c', { count: 789 })
  expect(cacheManager.has('c')).toBe(true)
  cacheManager.remove('c')
  expect(cacheManager.has('c')).toBe(false)

  cacheManager.set('d', { count: 111 })
  cacheManager.clear()
  expect(cacheManager.has('d')).toBe(false)
})

describe('enumOf', () => {
  it('exposes enum values as direct properties (primitive config)', () => {
    const Status = enumOf({
      Idle: 0,
      Pending: 1,
      Done: 2,
    })
    expect(Status.Idle).toBe(0)
    expect(Status.Pending).toBe(1)
    expect(Status.Done).toBe(2)
  })

  it('exposes enum values as direct properties (object config)', () => {
    const Status = enumOf({
      Success: { value: 1, label: 'Success' },
      Warning: { value: 2, label: 'Warning' },
    })
    expect(Status.Success).toBe(1)
    expect(Status.Warning).toBe(2)
  })

  it('values() returns array of all values', () => {
    const Status = enumOf({
      A: 1,
      B: { value: 2, label: 'B' },
      C: 'c',
    })
    const vals = Status.values()
    expect(vals).toHaveLength(3)
    expect(vals).toContain(1)
    expect(vals).toContain(2)
    expect(vals).toContain('c')
  })

  it('label(v) returns label for value (string)', () => {
    const Status = enumOf({
      Success: { value: 1, label: 'Success' },
      Warning: { value: 2, label: 'Warning' },
    })
    expect(Status.label(1)).toBe('Success')
    expect(Status.label(2)).toBe('Warning')
  })

  it('label(v) returns empty string for primitive config or missing label', () => {
    const Status = enumOf({ Idle: 0, Done: 1 })
    expect(Status.label(0)).toBe('')
    expect(Status.label(1)).toBe('')
  })

  it('label(v) resolves getter function', () => {
    const Status = enumOf({
      Ok: { value: 1, label: () => 'Resolved OK' },
    })
    expect(Status.label(1)).toBe('Resolved OK')
  })

  it('labels() returns array of labels in config order', () => {
    const Status = enumOf({
      A: { value: 1, label: 'A' },
      B: { value: 2, label: 'B' },
      C: 3,
    })
    expect(Status.labels()).toEqual(['A', 'B', ''])
  })

  it('description(v) returns description for value', () => {
    const Status = enumOf({
      Success: { value: 1, label: 'S', description: 'Operation succeeded' },
    })
    expect(Status.description(1)).toBe('Operation succeeded')
  })

  it('description(v) returns empty string when missing', () => {
    const Status = enumOf({ A: { value: 1, label: 'A' } })
    expect(Status.description(1)).toBe('')
  })

  it('description(v) resolves getter function', () => {
    const Status = enumOf({
      Ok: { value: 1, description: () => 'Resolved desc' },
    })
    expect(Status.description(1)).toBe('Resolved desc')
  })

  it('descriptions() returns array of descriptions in config order', () => {
    const Status = enumOf({
      A: { value: 1, description: 'Desc A' },
      B: { value: 2 },
      C: 3,
    })
    expect(Status.descriptions()).toEqual(['Desc A', '', ''])
  })

  it('option(v) returns resolved option object for object config', () => {
    const Status = enumOf({
      Success: { value: 1, label: 'Success', description: 'Done' },
    })
    const opt = Status.option(1)
    expect(opt).toEqual({ value: 1, label: 'Success', description: 'Done' })
  })

  it('option(v) returns { value, label, description } for primitive config', () => {
    const Status = enumOf({ Idle: 0 })
    const opt = Status.option(0)
    expect(opt).toEqual({ value: 0, label: '', description: '' })
  })

  it('option(v) resolves label/description getters', () => {
    const Status = enumOf({
      Ok: { value: 1, label: () => 'OK', description: () => 'OK desc' },
    })
    const opt = Status.option(1)
    expect(opt.label).toBe('OK')
    expect(opt.description).toBe('OK desc')
  })

  it('option(v) resolves extended fields with callOrReturn', () => {
    const Status = enumOf({
      Success: { value: 1, label: 'S', color: 'green', icon: () => 'check' },
    })
    const opt = Status.option(1)
    expect(opt.value).toBe(1)
    expect(opt.label).toBe('S')
    expect(opt.color).toBe('green')
    expect(opt.icon).toBe('check')
  })

  it('options() returns array of all resolved options', () => {
    const Status = enumOf({
      A: { value: 1, label: 'A' },
      B: { value: 2, label: 'B' },
    })
    const list = Status.options()
    expect(list).toHaveLength(2)
    expect(list[0]).toMatchObject({ value: 1, label: 'A' })
    expect(list[1]).toMatchObject({ value: 2, label: 'B' })
  })

  it('options() resolves extended fields with callOrReturn', () => {
    const Status = enumOf({
      Success: { value: 1, color: () => 'green' },
      Warning: { value: 2, color: 'yellow' },
    })
    const list = Status.options()
    expect(list[0].color).toBe('green')
    expect(list[1].color).toBe('yellow')
  })

  it('supports boolean and string enum values', () => {
    const Bool = enumOf({ Yes: true, No: false })
    expect(Bool.Yes).toBe(true)
    expect(Bool.No).toBe(false)
    expect(Bool.values()).toEqual([true, false])

    const Str = enumOf({ Foo: 'foo', Bar: 'bar' })
    expect(Str.Foo).toBe('foo')
    expect(Str.values()).toContain('foo')
  })
})
