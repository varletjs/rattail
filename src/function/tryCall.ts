export function tryCall<Args extends any[], T>(
  fn: (...args: Args) => T,
  ...args: Args
): [unknown, undefined] | [undefined, T] {
  try {
    const result = fn(...args)

    return [undefined, result]
  } catch (e) {
    return [e, undefined]
  }
}
