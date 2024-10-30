import { isArray } from './general'

export function NOOP() {}

export function debounce<F extends (...args: any[]) => any>(fn: F, delay = 0) {
  let timer: any

  return function (this: unknown, ...args: Parameters<F>) {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

export function throttle<F extends (...args: any[]) => any>(fn: F, delay = 200) {
  let timer: any
  let start = 0

  return function loop(this: unknown, ...args: Parameters<F>) {
    const now = performance.now()
    const elapsed = now - start

    if (!start) {
      start = now
    }

    if (timer) {
      clearTimeout(timer)
    }

    if (elapsed >= delay) {
      fn.apply(this, args)
      start = now
    } else {
      timer = setTimeout(() => {
        loop.apply(this, args)
      }, delay - elapsed)
    }
  }
}

export function call<P extends any[], R>(
  fn?: ((...arg: P) => R) | ((...arg: P) => R)[] | null,
  ...args: P
): R | R[] | undefined {
  if (isArray(fn)) {
    return fn.map((f) => f(...args))
  }

  if (fn) {
    return fn(...args)
  }
}
