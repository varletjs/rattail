export function isObject(val: unknown): val is Record<string, any> {
  return typeof val === 'object' && val !== null
}
