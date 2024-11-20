export function isArray(val: unknown): val is any[] {
  return Array.isArray(val)
}
