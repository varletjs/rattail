export function isPrimitive(val: unknown): boolean {
  return val == null || (typeof val !== 'object' && typeof val !== 'function')
}
