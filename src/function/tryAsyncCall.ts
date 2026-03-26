export async function tryAsyncCall<Args extends any[], T>(
  fn: (...args: Args) => Promise<T>,
  ...args: Args
): Promise<[unknown, undefined] | [undefined, T]> {
  try {
    const result = await fn(...args)

    return [undefined, result]
  } catch (e) {
    return [e, undefined]
  }
}
