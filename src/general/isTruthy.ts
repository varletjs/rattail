export function isTruthy<T>(v: T): v is NonNullable<T> {
  return Boolean(v)
}
