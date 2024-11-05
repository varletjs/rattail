const { hasOwnProperty } = Object.prototype

export function hasOwn<T extends object>(val: T, key: PropertyKey): key is keyof T {
  return hasOwnProperty.call(val, key)
}
