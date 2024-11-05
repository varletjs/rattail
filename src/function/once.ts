export function once<F extends (...args: any[]) => any>(fn: F) {
  let called = false
  let result: ReturnType<F>

  return function (this: unknown, ...args: Parameters<F>): ReturnType<F> {
    if (called) {
      return result
    }

    called = true
    result = fn.apply(this, args)
    return result
  }
}
