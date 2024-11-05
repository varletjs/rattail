export function isArray(val: unknown): val is Array<any> {
  return Array.isArray(val)
}
