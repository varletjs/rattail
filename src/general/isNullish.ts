export function isNullish(val: unknown): val is null | undefined {
  return val == null
}
