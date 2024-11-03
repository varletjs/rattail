import { getGlobalThis, isArray, isWindow, isString } from './general'
import { pascalCase } from './string'

export function requestAnimationFrame(fn: FrameRequestCallback): number {
  const globalThis = getGlobalThis()

  return globalThis.requestAnimationFrame ? globalThis.requestAnimationFrame(fn) : globalThis.setTimeout(fn)
}

export function cancelAnimationFrame(handle: number) {
  const globalThis = getGlobalThis()

  globalThis.cancelAnimationFrame ? globalThis.cancelAnimationFrame(handle) : globalThis.clearTimeout(handle)
}

export function raf() {
  return new Promise((resolve) => {
    requestAnimationFrame(resolve)
  })
}

export function doubleRaf() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve)
    })
  })
}

export function getStyle(element: Element) {
  return window.getComputedStyle(element)
}

export function getRect(element: Element | Window): DOMRect {
  if (isWindow(element)) {
    const width = element.innerWidth
    const height = element.innerHeight
    const rect = {
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: width,
      bottom: height,
      width,
      height,
    }

    return {
      ...rect,
      toJSON: () => rect,
    }
  }

  return element.getBoundingClientRect()
}

export function inViewport(element: HTMLElement) {
  const { top, bottom, left, right } = getRect(element)
  const { width, height } = getRect(window)

  const xInViewport = left <= width && right >= 0
  const yInViewport = top <= height && bottom >= 0

  return xInViewport && yInViewport
}

export function getParentScroller(el: HTMLElement): HTMLElement | Window {
  let element = el

  while (element) {
    if (!element.parentNode) {
      break
    }

    element = element.parentNode as HTMLElement

    if (element === document.body || element === document.documentElement) {
      break
    }

    const scrollRE = /(scroll|auto)/
    const { overflowY, overflow } = getStyle(element)

    if (scrollRE.test(overflowY) || scrollRE.test(overflow)) {
      return element
    }
  }

  return window
}

export function getAllParentScroller(el: HTMLElement): Array<HTMLElement | Window> {
  const allParentScroller: Array<HTMLElement | Window> = []
  let element: HTMLElement | Window = el

  while (!isWindow(element)) {
    element = getParentScroller(element)
    allParentScroller.push(element)
  }

  return allParentScroller
}

export function preventDefault(event: Event) {
  if (event.cancelable === false) {
    return
  }

  event.preventDefault()
}

export function getScrollTop(element: Element | Window) {
  const top = 'scrollTop' in element ? element.scrollTop : element.scrollY

  // iOS scroll bounce cause minus scrollTop
  return Math.max(top, 0)
}

export function getScrollLeft(element: Element | Window) {
  const left = 'scrollLeft' in element ? element.scrollLeft : element.scrollX

  return Math.max(left, 0)
}

export function tryParseJSON<T>(json: string): T | undefined {
  try {
    return JSON.parse(json)
  } catch {
    return undefined
  }
}

export function prettyJSONObject(jsonObject: Record<string, any>) {
  return JSON.stringify(jsonObject, null, 2)
}

export type ClassName = string | undefined | null

export type Classes = (ClassName | [any, ClassName, ClassName?])[]

export function classes(...classes: Classes): any[] {
  return classes.map((className) => {
    if (isArray(className)) {
      const [condition, truthy, falsy = null] = className
      return condition ? truthy : falsy
    }

    return className
  })
}

export type BEM<S extends string | undefined, N extends string, NC extends string> = S extends undefined
  ? NC
  : S extends `$--${infer CM}`
    ? `${N}--${CM}`
    : S extends `--${infer M}`
      ? `${NC}--${M}`
      : `${NC}__${S}`

export function createNamespaceFn<N extends string>(namespace: N) {
  return <C extends string>(name: C) => {
    const componentName = `${namespace}-${name}` as const

    const createBEM = <S extends string | undefined = undefined>(
      suffix?: S,
    ): BEM<S, typeof namespace, typeof componentName> => {
      if (!suffix) {
        return componentName as any
      }

      if (suffix[0] === '$') {
        return suffix.replace('$', namespace) as any
      }

      return (suffix.startsWith('--') ? `${componentName}${suffix}` : `${componentName}__${suffix}`) as any
    }

    return {
      name: pascalCase(componentName),
      n: createBEM,
      classes,
    }
  }
}

export interface Storage extends globalThis.Storage {
  set(key: string, value: any): void
  get(key: string): any
  remove(key: string): void
}

export function createStorage(storage: globalThis.Storage): Storage {
  return {
    ...storage,

    set(key: string, value: unknown) {
      if (value == null) {
        return
      }

      if (!isString(value)) {
        value = JSON.stringify(value)
      }

      storage.setItem(key, value as string)
    },

    get(key: string) {
      const data = storage.getItem(key) as string

      try {
        return JSON.parse(data)
      } catch (err) {
        return data
      }
    },

    remove(key: string): void {
      storage.removeItem(key)
    },
  }
}

export const sessionStorage = createStorage(globalThis.sessionStorage)

export const localStorage = createStorage(globalThis.localStorage)


type CopyResult = {
  success: boolean
  error?: Error
}

export function copyText(value: string): CopyResult | undefined {
  if (!value) {
    console.warn('No text provided to copy.')
    return { success: false }
  }

  try {
    const textArea = document.createElement('textarea')
    textArea.value = value
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  } catch (error) {
    return { success: false, error: error as Error }
  }
}
