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
