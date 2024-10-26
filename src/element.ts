import { getGlobalThis, isArray, isWindow } from './general'
import { bigCamelize } from './string'

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
      name: bigCamelize(componentName),
      n: createBEM,
      classes,
    }
  }
}
