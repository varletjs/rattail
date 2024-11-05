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
