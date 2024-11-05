export function isNullish<T>(val: T | null | undefined): val is NonNullable<T> {
  return val == null
}
